require('node-jsx').install();

var _ = require('underscore');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');
var mongoose = require('mongoose');
var request = require('request');
var xml2js = require('xml2js');
var React = require('react');
var Router = require('react-router');
var config = require('./config');
var sendgrid   = require('sendgrid')(config.sendgrid.username, config.sendgrid.password);

var app = express();

var reactRoutes = require('./app/routes');
mongoose.connect('localhost');

var Character = mongoose.model('Character', {
  characterId: { type: String, unique: true, index: true },
  name: String,
  race: String,
  gender: String,
  bloodline: String,
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
  random: { type: [Number], index: '2d' },
  voted: { type: Boolean, default: false }
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
app.get('/api/characters', function(req, res, next) {
  var choices = ['female', 'male'];
  var randomGender = _.sample(choices);

  Character
    .find({ random: { $near: [Math.random(), 0] } })
    .where('voted', false)
    .where('gender', randomGender)
    .limit(2)
    .exec(function(err, characters) {
      if (err) {
        return next(err);
      }

      if (characters.length < 2) {
        var oppositeGender = _.first(_.without(choices, randomGender));

        Character
          .find({ random: { $near: [Math.random(), 0] } })
          .where('voted', false)
          .where('gender', oppositeGender)
          .limit(2)
          .exec(function(err, characters) {
            if (err) {
              return next(err);
            }

            if (characters.length < 2) {
              Character.update({}, { $set: { voted: false } }, { multi: true }, function(err) {
                if (err) {
                  return next(err);
                }

                res.send([]);
              });
            } else {
              res.send(characters);
            }
          });
      } else {
        res.send(characters);
      }
    });
});


/**
 * PUT /api/characters
 * Update winning and losing count for both characters.
 */
app.put('/api/characters', function(req, res, next) {
  var winner = req.body.winner;
  var loser = req.body.loser;

  if (!winner || !loser) {
    return res.status(400).send({ message: 'Voting requires two characters' });
  }

  if (winner === loser) {
    return res.status(400).send({ message: 'Cannot vote for and against the same character' });
  }

  async.parallel([
      function(callback) {
        Character.findOne({ characterId: winner }, function(err, winner) {
          callback(err, winner);
        });
      },
      function(callback) {
        Character.findOne({ characterId: loser }, function(err, loser) {
          callback(err, loser);
        });
      }
    ],
    function(err, results) {
      if (err) return next(err);

      var winner = results[0];
      var loser = results[1];

      if (!winner || !loser) {
        return res.status(404).send({ message: 'One of the characters no longer exists' });
      }

      if (winner.voted || loser.voted) {
        return res.status(200).end();
      }

      async.parallel([
        function(callback) {
          winner.wins++;
          winner.voted = true;
          winner.random = [Math.random(), 0];
          winner.save(function(err) {
            callback(err);
          });
        },
        function(callback) {
          loser.losses++;
          loser.voted = true;
          loser.random = [Math.random(), 0];
          loser.save(function(err) {
            callback(err);
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.status(200).end();
      });
    });
});

/**
 * GET /api/characters/shame
 * Return 100 lowest ranked characters for hall of shame
 */
app.get('/api/characters/shame', function(req, res, next) {
  Character
    .find()
    .sort('-losses')
    .limit(100)
    .exec(function(err, characters) {
      if (err) return next(err);
      res.send(characters);
    });
});

/**
 * GET /delete/:id
 * Delete a character
 */
//app.get('/delete/:id', function(req, res) {
//  var id = req.params.id;
//  Character.remove({ characterId: id}, function(err, status) {
//    console.log(err, status);
//  });
//});

/**
 * GET /characters/new
 * Return 100 new characters
 */
app.get('/api/characters/new', function(req, res, next) {
  Character
    .find()
    .sort({ _id: -1 })
    .limit(100)
    .exec(function(err, characters) {
      if (err) return next(err);
      res.send(characters);
    });
});

/**
 * GET /browse
 * @param page
 */
app.get('/api/browse', function(req, res, next) {
  var page = req.query.currentPage;
  Character
    .find()
    .limit(30)
    .skip(page * 30)
    .exec(function(err, characters) {
      if (err) return next(err);
      res.send(characters);
    });
});

/**
 * GET /characters/top
 * Return 100 highest ranked characters
 * Filter gender, race, bloodline by a querystring
 */
app.get('/api/characters/top', function(req, res, next) {
  var conditions = {};
  for (var key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      conditions[key] = new RegExp('^' + req.query[key] + '$', 'i');
    }
  }
  Character
    .find(conditions)
    .sort('-wins')
    .limit(150)
    .exec(function(err, characters) {
      if (err) return next(err);
      characters.sort(function(a, b) {
        if (a.wins / (a.wins + a.losses) < b.wins / (b.wins + b.losses)) return 1;
        if (a.wins / (a.wins + a.losses) > b.wins / (b.wins + b.losses)) return -1;
        return 0;
      });
      res.send(characters.slice(0, 100));
    });
});

/**
 * GET /leaderboard
 * Return 12 characters sorted by the winning percentage
 */
app.get('/api/leaderboard', function(req, res, next) {
  Character
    .find()
    .sort('-wins')
    .limit(5)
    .lean()
    .exec(function(err, characters) {
      if (err) return next(err);
      characters.sort(function(a, b) {
        if (a.wins / (a.wins + a.losses) < b.wins / (b.wins + b.losses)) return 1;
        if (a.wins / (a.wins + a.losses) > b.wins / (b.wins + b.losses)) return -1;
        return 0;
      });
      res.send(characters);
    });
});

/**
 * GET /characters/all
 * Returns a total # of characters in the DB
 */
app.get('/api/characters/all', function(req, res, next) {
  Character.count({}, function(err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
});

/**
 * POST /characters/search
 * @param name
 * Character search
 */
app.post('/api/characters/search', function(req, res, next) {
  var characterName = new RegExp(req.body.name, 'i');
  Character.findOne({ name: characterName }, function(err, character) {
    if (err) return next(err);
    if (character) {
      res.send(character);
    } else {
      res.send({});
    }
  });
});

/**
 * GET /characters/:id
 * Return detailed character information
 */
app.get('/api/characters/:id', function(req, res, next) {
  Character.findOne({ characterId: req.params.id }).lean().exec(function(err, character) {
    if (err) {
      return next(err);
    }

    if (!character) {
      return res.status(404).send({ message: 'Character Not Found' });
    }

    character.winLossRatio = (character.wins / (character.wins + character.losses) * 100).toFixed(1);
    res.send(character);
  });
});

/**
 * POST /api/characters
 * Add new character
 */
app.post('/api/characters', function(req, res, next) {
  var gender = req.body.gender;
  var characterName = decodeURIComponent(req.body.name || '');

  var parser = new xml2js.Parser();
  var characterIdUrl = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=' + characterName;

  async.waterfall([
    function(callback) {
      request.get(characterIdUrl, function(e, r, xml) {
        if (e) return next(e);
        parser.parseString(xml, function(err, parsedXml) {
          if (err) return next(err);
          try {
            var characterId = parsedXml.eveapi.result[0].rowset[0].row[0].$.characterID;
            Character.findOne({ characterId: characterId }, function(err, character) {
              if (character) return res.send(409, { characterId: character.characterId });
              callback(err, characterId);
            });
          } catch (e) {
            return res.send(404, { message: 'Character Not Found' });
          }

        });
      });
    },
    function(characterId, callback) {
      var characterInfoUrl = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=' + characterId;
      request.get({ url: characterInfoUrl }, function(e, r, xml) {
        if (e) return next(e);
        parser.parseString(xml, function(err, parsedXml) {
          if (err) return res.send(err);
          try {
            var name = parsedXml.eveapi.result[0].characterName[0];
            var race = parsedXml.eveapi.result[0].race[0];
            var bloodline = parsedXml.eveapi.result[0].bloodline[0];

            var character = new Character({
              characterId: characterId,
              name: name,
              race: race,
              bloodline: bloodline,
              gender: gender,
              random: [Math.random(), 0]
            });
            character.save(function(err) {
              if (err) return next(err);
              res.send(character);
            });
            callback(null);
          } catch (e) {
            return res.send(404, { message: 'Character Not Found' });
          }

        });
      });
    }
  ]);
});

/**
 * GET /api/stats
 * Display DB statistics
 */
app.get('/api/stats', function(req, res, next) {
  async.parallel([
      function(callback) {
        Character.count({}, function(err, count) {
          callback(err, count);
        });
      },
      function(callback) {
        Character.count({ race: 'Amarr' }, function(err, amarrCount) {
          callback(err, amarrCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Caldari' }, function(err, caldariCount) {
          callback(err, caldariCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Gallente' }, function(err, gallenteCount) {
          callback(err, gallenteCount);
        });
      },
      function(callback) {
        Character.count({ race: 'Minmatar' }, function(err, minmatarCount) {
          callback(err, minmatarCount);
        });
      },
      function(callback) {
        // Total males
        Character.count({ gender: 'male' }, function(err, maleCount) {
          callback(err, maleCount);
        });
      },
      function(callback) {
        // Total females
        Character.count({ gender: 'female' }, function(err, femaleCount) {
          callback(err, femaleCount);
        });
      },
      function(callback) {
        // Total votes cast
        Character.aggregate(
          { $group: { _id: null, total: { $sum: '$wins' } } },
          function(err, winsCount) {
            callback(err, winsCount[0].total);
          }
        );
      },
      function(callback) {
        // Race count in Top 100
        Character
          .find()
          .sort('-wins')
          .limit(100)
          .select('race')
          .exec(function(err, characters) {
            if (err) return next(err);
            var raceCount = _.countBy(characters, function(character) {
              return character.race;
            });
            var max = _.max(raceCount, function(race) {
              return race
            });
            var inverted = _.invert(raceCount);
            var topRace = inverted[max];
            var topCount = raceCount[topRace];
            callback(err, { race: topRace, count: topCount });
          });
      },
      function(callback) {
        // Race count in Top 100
        Character
          .find()
          .sort('-wins')
          .limit(100)
          .select('bloodline')
          .exec(function(err, characters) {
            if (err) return next(err);
            var bloodlineCount = _.countBy(characters, function(character) {
              return character.bloodline;
            });
            var max = _.max(bloodlineCount, function(bloodline) {
              return bloodline
            });
            var inverted = _.invert(bloodlineCount);
            var topBloodline = inverted[max];
            var topCount = bloodlineCount[topBloodline];
            callback(err, { bloodline: topBloodline, count: topCount });
          });
      }
    ],
    function(err, results) {
      if (err) return next(err);
      var totalCount = results[0];
      var amarrCount = results[1];
      var caldariCount = results[2];
      var gallenteCount = results[3];
      var minmatarCount = results[4];
      var maleCount = results[5];
      var femaleCount = results[6];
      var totalVotes = results[7];
      var leadingRace = results[8];
      var leadingBloodline = results[9];

      res.send({
        totalCount: totalCount,
        amarrCount: amarrCount,
        caldariCount: caldariCount,
        gallenteCount: gallenteCount,
        minmatarCount: minmatarCount,
        maleCount: maleCount,
        femaleCount: femaleCount,
        totalVotes: totalVotes,
        leadingRace: leadingRace,
        leadingBloodline: leadingBloodline
      });
    });
});

/**
 * POST /api/gender
 * @param characterId
 * @param gender
 * Update character's gender
 */
app.post('/api/gender', function(req, res, next) {
  var characterId = req.body.characterId;
  var gender = req.body.gender;
  Character.findOne({ characterId: characterId }, function(err, character) {
    if (err) return next(err);
    if (!character) return res.send(404);
    character.gender = gender;
    character.wrongGender = false;
    character.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
});


/**
 * POST /api/report
 * Reports a character. Character is removed after 4 reports.
 */
app.post('/api/report', function(req, res, next) {
  var characterId = req.body.characterId;

  Character.findOne({ characterId: characterId }, function(err, character) {
    if (err) return next(err);
    if (!character) {
      return res.status(404).send({ message: 'Character Not Found' });
    }

    character.reports++;

    if (character.reports > 4) {
      character.remove();
      return res.send({ message: character.name + ' has been deleted' });
    }

    character.save(function(err) {
      if (err) return next(err);
      res.send({ message: character.name + ' has been reported' });
    });
  });
});

app.post('/api/subscribe', function(req, res, next) {
  var email = new sendgrid.Email();
  email.addTo('sakhat@gmail.com');
  email.setFrom('sakhat@gmail.com');
  email.setSubject('[sendgrid-php-example] Owl');
  email.setText('Owl are you doing?');
  email.setHtml('<strong>%how% are you doing?</strong>');
  email.addSubstitution("%how%", "Owl");
  email.addHeader('X-Sent-Using', 'SendGrid-API');
  email.addHeader('X-Transport', 'web');

  sendgrid.send(email, function(err, json) {
    if (err) return next(err);
    console.log(json);
  });
});

app.use(function(req, res, next) {
  Router.run(reactRoutes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler, { path: req.path }));
    //res.render('index', { html: html });
    res.send(html);
  });
});

app.use(function(err, req, res, next) {
  // TODO: sendgrid email notification
  res.status(err.status || 500);
  res.send({ message: err.message });
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;
  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});