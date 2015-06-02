(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AddCharacterActions = alt.createActions({
  addCharacter: function(name, gender) {
    WebAPIUtils.addCharacter(name, gender)
      .done(function(data) {
        this.actions.addCharacterSucceeded(data.message);
      }.bind(this))
      .fail(function(jqXHR) {
        this.actions.addCharacterFailed(jqXHR.responseJSON.message);
      }.bind(this));
  },

  addCharacterSuccess: function(message) {
    this.dispatch(message);
  },

  addCharacterFail: function(message) {
    this.dispatch(message);
  },

  updateCharacterName: function(event) {
    this.dispatch(event.target.value);
  }
});

module.exports = AddCharacterActions;

},{"../alt":2,"../utils/WebAPIUtils":14}],2:[function(require,module,exports){
var Alt = require('alt');

var alt = new Alt();

module.exports = alt;

},{"alt":16}],3:[function(require,module,exports){
var React = require('react');

var AddCharacterStore = require('../stores/AddCharacterStore');
var AddCharacterActions = require('../actions/AddCharacterActions');

var AddCharacter = React.createClass({displayName: "AddCharacter",

  getInitialState: function() {
    return AddCharacterStore.getState();
  },

  componentDidMount: function() {
    AddCharacterStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    AddCharacterStore.unlisten(this.onChange);
  },

  onChange: function() {
    this.setState(AddCharacterStore.getState());
  },

  handleGenderChange: function(event) {
    this.setState({
      gender: event.target.value,
      genderValidationState: ''
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    if (!name) {
      this.refs.nameInput.getDOMNode().focus();
      this.setState({
        nameValidationState: 'has-error',
        helpBlock: 'Please enter a character name.'
      });
      return;
    }

    if (!gender) {
      this.setState({
        genderValidationState: 'has-error'
      });
      return;
    }

    AddCharacterActions.addCharacter(name, gender);
  },

  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "row flipInX animated"}, 
          React.createElement("div", {className: "col-sm-8"}, 
            React.createElement("div", {className: "panel panel-default"}, 
              React.createElement("div", {className: "panel-heading"}, "Add Character"), 
              React.createElement("div", {className: "panel-body"}, 
                React.createElement("form", {onSubmit: this.handleSubmit}, 
                  React.createElement("div", {className: 'form-group ' + this.state.nameValidationState}, 
                    React.createElement("label", {className: "control-label"}, "Character Name"), 
                    React.createElement("input", {type: "text", className: "form-control", ref: "nameInput", value: this.state.name, onChange: AddCharacterActions.updateCharacterName, autoFocus: true}), 
                    React.createElement("span", {className: "help-block"}, this.state.helpBlock)
                  ), 
                  React.createElement("div", {className: 'form-group ' + this.state.genderValidationState}, 
                    React.createElement("div", {className: "radio radio-inline"}, 
                      React.createElement("input", {type: "radio", name: "gender", id: "female", value: "female", checked: this.state.gender === 'female', onChange: this.handleGenderChange}), 
                      React.createElement("label", {htmlFor: "female"}, "Female")
                    ), 
                    React.createElement("div", {className: "radio radio-inline"}, 
                      React.createElement("input", {type: "radio", name: "gender", id: "male", value: "male", checked: this.state.gender === 'male', onChange: this.handleGenderChange}), 
                      React.createElement("label", {htmlFor: "male"}, "Male")
                    )
                  ), 
                  React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Submit")
                )
              )
            )
          )
        )
      )
    );
  }
});

module.exports = AddCharacter;

},{"../actions/AddCharacterActions":1,"../stores/AddCharacterStore":13,"react":"react"}],4:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var Navbar = require('./Navbar');
var Footer = require('./Footer');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("html", null, 
      React.createElement("head", null, 
        React.createElement("meta", {charSet: "utf-8"}), 
        React.createElement("meta", {httpEquiv: "X-UA-Compatible", content: "IE=edge"}), 
        React.createElement("meta", {name: "viewport", content: "width=device-width, initial-scale=1"}), 
        React.createElement("title", null, "New Eden Faces"), 
        React.createElement("link", {rel: "shortcut icon", href: "/favicon.png"}), 
        React.createElement("link", {rel: "stylesheet", href: "http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900"}), 
        React.createElement("link", {rel: "stylesheet", href: "/css/main.css"})
      ), 
      React.createElement("body", null, 
        React.createElement(Navbar, null), 
        React.createElement(RouteHandler, null), 
        React.createElement(Footer, null), 
        React.createElement("script", {src: "/socket.io/socket.io.js"}), 
        React.createElement("script", {src: "/js/vendor.js"}), 
        React.createElement("script", {src: "/js/vendor-bundle.js"}), 
        React.createElement("script", {src: "/js/bundle.js"})
      )
      )
    );
  }
});

module.exports = App;

},{"./Footer":7,"./Navbar":9,"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
var _ = require('underscore');
var React = require('react');

var Character = React.createClass({displayName: "Character",
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      email: '',
      characterId: 0,
      name: 'TBD',
      race: 'TBD',
      bloodline: 'TBD',
      gender: 'TBD',
      wins: 0,
      losses: 0,
      winLossRatio: 0
    }
  },

  componentDidMount: function() {
    this.setState({ path: this.context.router.getCurrentPath() });

    this.getCharacter()
      .done(function(data) {
        document.body.classList.add('profile');
        document.body.classList.add('profile-' + data.race.toLowerCase());

        var reported = false;
        var subscribed = false;
        var localData = localStorage.getItem('newedenfaces');

        if (localData) {
          var json = JSON.parse(localData);

          if (json.reports && json.reports.indexOf(data.characterId) > -1) {
            reported = true;
          }

          if (json.subscribed && json.subscribed.indexOf(data.characterId) > -1) {
            subscribed = true;
          }
        }

        this.setState({
          characterId: data.characterId,
          name: data.name,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio,
          reported: reported,
          subscribed: subscribed
        });

        $('.magnific-popup').magnificPopup({
          type: 'image',
          mainClass: 'mfp-zoom-in',
          closeOnContentClick: true,
          midClick: true,
          zoom: {
            enabled: true,
            duration: 300
          }
        });
      }.bind(this));
  },

  componentWillUnmount: function() {
    document.body.classList.remove('profile');
    document.body.classList.remove('profile-' + this.state.race.toLowerCase());
  },

  componentDidUpdate: function() {
    var currentPath = this.context.router.getCurrentPath();

    if (currentPath === this.state.path) {
      return;
    }

    this.setState({ path: currentPath });

    this.refs.container.getDOMNode().classList.remove('fadeIn');

    this.getCharacter()
      .done(function(data) {
        document.body.classList.remove('profile-' + this.state.race.toLowerCase());
        document.body.classList.add('profile-' + data.race.toLowerCase());
        this.refs.container.getDOMNode().classList.add('fadeIn');

        var reported = false;
        var subscribed = false;
        var localData = localStorage.getItem('newedenfaces');

        if (localData) {
          var json = JSON.parse(localData);

          if (json.reports && json.reports.indexOf(data.characterId) > -1) {
            reported = true;
          }

          if (json.subscribed && json.subscribed.indexOf(data.characterId) > -1) {
            subscribed = true;
          }
        }

        this.setState({
          characterId: data.characterId,
          name: data.name,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio,
          reported: reported,
          subscribed: subscribed
        });

        $('.magnific-popup').magnificPopup({
          type: 'image',
          mainClass: 'mfp-zoom-in',
          closeOnContentClick: true,
          midClick: true,
          zoom: {
            enabled: true,
            duration: 300
          }
        });
      }.bind(this));
  },

  getCharacter: function() {
    return $.ajax({ url: '/api/characters/' + this.context.router.getCurrentParams().id })
  },

  handleReportCharacter: function() {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { characterId: this.state.characterId }
    })
      .done(function() {
        var localData = localStorage.getItem('newedenfaces');
        var json = JSON.parse(localData) || {};

        json.reports = json.reports || [];
        json.reports.push(this.state.characterId);

        localStorage.setItem('newedenfaces', JSON.stringify(json));

        this.setState({ reported: true });
      }.bind(this));
  },

  handleSubscribeSubmit: function(event) {
    event.preventDefault();

    if (!this.state.email) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/api/subscribe',
      data: { email: this.state.email, characterId: this.state.characterId }
    })
      .done(function() {
        var localData = localStorage.getItem('newedenfaces');
        var json = JSON.parse(localData) || {};

        json.subscribed = json.subscribed || [];
        json.subscribed.push(this.state.characterId);

        localStorage.setItem('newedenfaces', JSON.stringify(json));

        this.setState({ subscribed: true });
      }.bind(this))
      .fail(function(jqXhr) {
        sweetAlert('Error', jqXhr.responseJSON.message, 'error');
      })
  },

  handleSubscribeChange: function(event) {
    this.setState({ email: event.target.value });
  },

  render: function() {

    var subscribeField = this.state.subscribed ? (
      React.createElement("div", {className: "text-center animated fadeIn"}, 
        "Thank you for subscribing!"
      )
    ) : (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
          React.createElement("form", {onSubmit: this.handleSubscribeSubmit}, 
            React.createElement("div", {className: "input-group"}, 
              React.createElement("input", {type: "text", className: "form-control", placeholder: "Email", onChange: this.handleSubscribeChange}), 
                React.createElement("span", {className: "input-group-btn"}, 
                  React.createElement("button", {className: "btn btn-default", onClick: this.handleSubscribeSubmit}, 
                    "Subscribe"
                  )
                )
            )
          )
        )
      )
    );

    var reportButton = this.state.reported ? (
      React.createElement("button", {className: "btn btn-transparent", disabled: true}, "Reported")
    ) : (
      React.createElement("button", {className: "btn btn-transparent", onClick: this.handleReportCharacter}, "Report Character")
    );

    return (
      React.createElement("div", {ref: "container", className: "container animated fadeIn"}, 
        React.createElement("div", {className: "profile-img"}, 
          React.createElement("a", {className: "magnific-popup", href: 'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}, 
            React.createElement("img", {src: 'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg'})
          )
        ), 
        React.createElement("div", {className: "profile-info clearfix"}, 
          React.createElement("h2", null, React.createElement("strong", null, this.state.name)), 
          React.createElement("h4", {className: "lead"}, "Race: ", React.createElement("strong", null, this.state.race)), 
          React.createElement("h4", {className: "lead"}, "Bloodline: ", React.createElement("strong", null, this.state.bloodline)), 
          React.createElement("h4", {className: "lead"}, "Gender: ", React.createElement("strong", null, this.state.gender)), 
          reportButton
        ), 
        React.createElement("div", {className: "profile-stats clearfix"}, 
          React.createElement("ul", null, 
            React.createElement("li", null, React.createElement("span", {className: "stats-number"}, this.state.winLossRatio), "Winning Percentage"), 
            React.createElement("li", null, React.createElement("span", {className: "stats-number"}, this.state.wins), " Wins"), 
            React.createElement("li", null, React.createElement("span", {className: "stats-number"}, this.state.losses), " Losses")
          )
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-sm-12 text-center"}, 
            React.createElement("h4", {className: "lead"}, " Subscribe for weekly statistics on ", React.createElement("strong", null, this.state.name))
          )
        ), 
        subscribeField
      )
    );
  }
});

module.exports = Character;

},{"react":"react","underscore":"underscore"}],6:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var CharacterList = React.createClass({displayName: "CharacterList",

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      characters: []
    }
  },

  fetchCharacters: function() {
    var routeParams = this.context.router.getCurrentParams();
    var currentPath = this.context.router.getCurrentPath();
    var baseUrl = '/api/characters/top';

    var options = {
      race: routeParams.race,
      bloodline: routeParams.bloodline
    };

    if (currentPath.indexOf('female') > -1) {
      options.gender = 'female';
    } else if (currentPath.indexOf('male') > -1) {
      options.gender = 'male';
    }

    $.get(baseUrl, options, function(data) {
      this.setState({ characters: data });
    }.bind(this));
  },

  fetchShame: function() {
    $.get('/api/characters/shame', function(data) {
      this.setState({ characters: data });
    }.bind(this));
  },

  componentDidMount: function() {
    var currentPath = this.context.router.getCurrentPath();

    if (currentPath.indexOf('shame') > -1) {
      this.fetchShame();
    } else {
      this.fetchCharacters();
    }

    this.setState({ path: currentPath });
  },


  componentDidUpdate: function() {
    var currentPath = this.context.router.getCurrentPath();

    if (currentPath === this.state.path) {
      return;
    }

    if (currentPath.indexOf('shame') > -1) {
      this.fetchShame();
    } else {
      this.fetchCharacters();
    }

    this.setState({ path: currentPath });
  },

  render: function() {
    var characterList = this.state.characters.map(function(character, index) {
      return (
        React.createElement("div", {key: character.characterId, className: "list-group-item animated fadeIn"}, 
          React.createElement("div", {className: "media"}, 
            React.createElement("span", {className: "position pull-left"}, index + 1), 

            React.createElement("div", {className: "pull-left thumb-lg"}, 
              React.createElement(Link, {to: '/characters/' + character.characterId}, 
                React.createElement("img", {className: "media-object", src: 'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'})
              )
            ), 
            React.createElement("div", {className: "media-body"}, 
              React.createElement("h4", {className: "media-heading"}, 
                React.createElement(Link, {to: '/characters/' + character.characterId}, character.name)
              ), 
              React.createElement("small", null, "Race: ", React.createElement("strong", null, character.race)), 
              React.createElement("br", null), 
              React.createElement("small", null, "Bloodline: ", React.createElement("strong", null, character.bloodline)), 
              React.createElement("br", null), 
              React.createElement("small", null, "Wins: ", React.createElement("strong", null, character.wins), " Losses: ", React.createElement("strong", null, character.losses))
            )
          )
        )
      );
    });

    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "list-group"}, 
          characterList
        )
      )
    );
  }
});

module.exports = CharacterList;

},{"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Footer = React.createClass({displayName: "Footer",

  getInitialState: function() {
    return {
      characters: []
    }
  },

  componentDidMount: function() {
    $.get('/api/characters/top', function(data) {
      this.setState({ characters: data.slice(0,5) });
    }.bind(this));
  },

  render: function() {
    var leaderboardCharacters = this.state.characters.map(function(character) {
      return (
        React.createElement("li", {key: character.characterId}, 
          React.createElement(Link, {to: '/characters/' + character.characterId}, 
            React.createElement("img", {className: "thumb-md", src: 'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'})
          )
        )
      )
    });

    return (
      React.createElement("footer", null, 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-sm-5"}, 
              React.createElement("h3", {className: "lead"}, React.createElement("strong", null, "Information"), " and ", React.createElement("strong", null, "Copyright")), 
              React.createElement("p", null, "Powered by ", React.createElement("strong", null, "Node.js"), ", ", React.createElement("strong", null, "MongoDB"), " and ", React.createElement("strong", null, "React"), " with Flux architecture and server-side rendering."), 
              React.createElement("p", null, "You may view the ", React.createElement("a", {href: "https://github.com/sahat/newedenfaces-react"}, "Source Code"), " behind this project on GitHub."), 
              React.createElement("p", null, "© 2015 Sahat Yalkabov.")
            ), 
            React.createElement("div", {className: "col-sm-7 hidden-xs"}, 
              React.createElement("h3", {className: "lead"}, React.createElement("strong", null, "Leaderboard"), " Top 5 Characters"), 
              React.createElement("ul", {className: "list-inline"}, 
                leaderboardCharacters
              )
            )
          )
        )
      )
    );
  }
});

module.exports = Footer;

},{"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Home = React.createClass({displayName: "Home",

  getInitialState: function() {
    return {
      characters: []
    }
  },

  componentDidMount: function() {
    this.getCharacters();
  },

  handleClick: function(character) {
    var winner = character;
    var loser = this.state.characters[1 - this.state.characters.indexOf(winner)];

    $.ajax({
      type: 'PUT',
      url: '/api/characters',
      data: { winner: winner.characterId, loser: loser.characterId },
      success: function() {
        this.getCharacters();
      }.bind(this)
    });
  },

  getCharacters: function() {
    $.ajax({ url: '/api/characters' })
      .done(function(data) {
        if (!data.length) {
          return this.getCharacters();
        }

        this.setState({ characters: data });
      }.bind(this));
  },

  render: function() {
    var characterNodes = this.state.characters.map(function(character, index) {
      return (
        React.createElement("div", {key: character.characterId, className: index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}, 
          React.createElement("div", {className: "thumbnail fadeInUp animated"}, 
            React.createElement("img", {onClick: this.handleClick.bind(this, character), src: 'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg'}), 
            React.createElement("div", {className: "caption text-center"}, 
              React.createElement("ul", {className: "list-inline"}, 
                React.createElement("li", null, React.createElement("strong", null, "Race:"), " ", character.race), 
                React.createElement("li", null, React.createElement("strong", null, "Bloodline:"), " ", character.bloodline)
              ), 
              React.createElement("h4", null, 
                React.createElement(Link, {to: '/characters/' + character.characterId}, React.createElement("strong", null, character.name))
              )
            )
          )
        )
      );
    }.bind(this));

    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h3", {className: "text-center"}, "Click on the portrait. Select your favorite."), 
        React.createElement("div", {className: "row"}, 
          characterNodes
        )
      )
    );
  }
});

module.exports = Home;

},{"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Navbar = React.createClass({displayName: "Navbar",

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      totalCharacters: 0,
      onlineUsers: 0,
      searchQuery: '',
      ajaxAnimation: ''
    }
  },

  componentDidMount: function() {
    var socket = io.connect();

    socket.on('onlineUsers', function (data) {
      this.setState({ onlineUsers: data.onlineUsers });
    }.bind(this));

    $(document).ajaxStart(function() {
      this.setState({ ajaxAnimation: 'fadeIn' });
    }.bind(this));

    $(document).ajaxComplete(function() {
      setTimeout(function() {
        this.setState({ ajaxAnimation: 'fadeOut' });
      }.bind(this), 750);
    }.bind(this));

    $.ajax({ url: '/api/characters/count' })
      .done(function(data) {
        this.setState({ totalCharacters: data.count });
      }.bind(this));
  },

  handleSearchChange: function(event) {
    this.setState({ searchQuery: event.target.value });
  },

  handleSubmit: function(event) {
    event.preventDefault();

    if (this.state.searchQuery) {
      $.ajax({
        url: '/api/characters/search',
        data: { name: this.state.searchQuery }
      }).done(function(data) {
        if (data) {
          this.context.router.transitionTo('/characters/' + data.characterId);
          this.setState({ searchQuery: '' });
        }
      }.bind(this))
        .fail(function() {
          this.refs.searchForm.getDOMNode().classList.add('shake');

          setTimeout(function() {
            this.refs.searchForm.getDOMNode().classList.remove('shake');
          }.bind(this), 1000)
        }.bind(this));
    }
  },

  render: function() {
    return (
      React.createElement("nav", {className: "navbar navbar-default navbar-static-top"}, 
        React.createElement("div", {className: "navbar-header"}, 
          React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar"}, 
            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
            React.createElement("span", {className: "icon-bar"}), 
            React.createElement("span", {className: "icon-bar"}), 
            React.createElement("span", {className: "icon-bar"})
          ), 
          React.createElement(Link, {to: "/", className: "navbar-brand"}, 
            React.createElement("span", {ref: "triangles", className: 'triangles animated ' + this.state.ajaxAnimation}, 
              React.createElement("div", {className: "tri invert"}), 
              React.createElement("div", {className: "tri invert"}), 
              React.createElement("div", {className: "tri"}), 
              React.createElement("div", {className: "tri invert"}), 
              React.createElement("div", {className: "tri invert"}), 
              React.createElement("div", {className: "tri"}), 
              React.createElement("div", {className: "tri invert"}), 
              React.createElement("div", {className: "tri"}), 
              React.createElement("div", {className: "tri invert"})
            ), 
            "NEF", 
            React.createElement("span", {className: "badge badge-up badge-danger"}, this.state.onlineUsers)
          )
        ), 
        React.createElement("div", {id: "navbar", className: "navbar-collapse collapse"}, 
          React.createElement("form", {ref: "searchForm", className: "navbar-form navbar-left animated", onSubmit: this.handleSubmit}, 
            React.createElement("div", {className: "input-group"}, 
              React.createElement("input", {type: "text", className: "form-control", placeholder: this.state.totalCharacters + ' characters', value: this.state.searchQuery, onChange: this.handleSearchChange}), 
              React.createElement("span", {className: "input-group-btn"}, 
                React.createElement("button", {className: "btn btn-default", onClick: this.handleSubmit}, React.createElement("span", {className: "glyphicon glyphicon-search"}))
              )
            )
          ), 
          React.createElement("ul", {className: "nav navbar-nav"}, 
            React.createElement("li", null, React.createElement(Link, {to: "/"}, "Home")), 
            React.createElement("li", null, React.createElement(Link, {to: "/stats"}, "Stats")), 
            React.createElement("li", {className: "dropdown"}, 
              React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, "Top 100 ", React.createElement("span", {className: "caret"})), 
              React.createElement("ul", {className: "dropdown-menu"}, 
                React.createElement("li", null, React.createElement(Link, {to: "/top"}, "Top Overall")), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/top/caldari"}, "Caldari"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/caldari/achura"}, "Achura")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/caldari/civire"}, "Civire")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/caldari/deteis"}, "Deteis"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/top/gallente"}, "Gallente"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/gallente/gallente"}, "Gallente")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/gallente/intaki"}, "Intaki")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/gallente/jin-mei"}, "Jin-Mei"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/top/minmatar"}, "Minmatar"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/minmatar/brutor"}, "Brutor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/minmatar/sebiestor"}, "Sebiestor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/minmatar/vherokior"}, "Vherokior"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/top/amarr"}, "Amarr"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/amarr/amarr"}, "Amarr")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/amarr/ni-kunni"}, "Ni-Kunni")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/top/amarr/khanid"}, "Khanid"))
                  )
                ), 
                React.createElement("li", {className: "divider"}), 
                React.createElement("li", null, React.createElement(Link, {to: "/shame"}, "Hall of Shame"))
              )
            ), 
            React.createElement("li", {className: "dropdown"}, 
              React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, "Female ", React.createElement("span", {className: "caret"})), 
              React.createElement("ul", {className: "dropdown-menu"}, 
                React.createElement("li", null, React.createElement(Link, {to: "/female"}, "All")), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/female/caldari"}, "Caldari"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/caldari/achura"}, "Achura")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/caldari/civire/"}, "Civire")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/caldari/deteis"}, "Deteis"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/female/gallente"}, "Gallente"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/gallente/gallente"}, "Gallente")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/gallente/intaki"}, "Intaki")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/gallente/jin-mei"}, "Jin-Mei"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/female/minmatar"}, "Minmatar"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/minmatar/brutor"}, "Brutor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/minmatar/sebiestor"}, "Sebiestor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/minmatar/vherokior"}, "Vherokior"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/female/amarr"}, "Amarr"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/amarr/amarr"}, "Amarr")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/amarr/ni-kunni"}, "Ni-Kunni")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/female/amarr/khanid"}, "Khanid"))
                  )
                )
              )
            ), 
            React.createElement("li", {className: "dropdown"}, 
              React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown"}, "Male ", React.createElement("span", {className: "caret"})), 
              React.createElement("ul", {className: "dropdown-menu"}, 
                React.createElement("li", null, React.createElement(Link, {to: "/male"}, "All")), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/male/caldari"}, "Caldari"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/caldari/achura"}, "Achura")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/caldari/civire"}, "Civire")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/caldari/deteis"}, "Deteis"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/male/gallente"}, "Gallente"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/gallente/gallente"}, "Gallente")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/gallente/intaki"}, "Intaki")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/gallente/jin-mei"}, "Jin-Mei"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/male/minmatar"}, "Minmatar"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/minmatar/brutor"}, "Brutor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/minmatar/sebiestor"}, "Sebiestor")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/minmatar/vherokior"}, "Vherokior"))
                  )
                ), 
                React.createElement("li", {className: "dropdown-submenu"}, 
                  React.createElement(Link, {to: "/male/amarr"}, "Amarr"), 
                  React.createElement("ul", {className: "dropdown-menu"}, 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/amarr/amarr"}, "Amarr")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/amarr/ni-kunni"}, "Ni-Kunni")), 
                    React.createElement("li", null, React.createElement(Link, {to: "/male/amarr/khanid"}, "Khanid"))
                  )
                )
              )
            ), 
            React.createElement("li", null, React.createElement(Link, {to: "/add"}, "Add"))
          )
        )
      )
    );
  }
});

module.exports = Navbar;

},{"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
var React = require('react');

var RouteNotFound = React.createClass({displayName: "RouteNotFound",
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null, "Page Not Found"), 
        React.createElement("p", null, "Sorry, but the page you were trying to view does not exist.")
      )
    );
  }
});

module.exports = RouteNotFound;

},{"react":"react"}],11:[function(require,module,exports){
var React = require('react');

var Stats = React.createClass({displayName: "Stats",
  getInitialState: function() {
    return {
      stats: {
        leadingRace: { race: 'TBD', count: 0 },
        leadingBloodline: { bloodline: 'TBD', count: 0 },
        amarrCount: 0,
        caldariCount: 0,
        gallenteCount: 0,
        minmatarCount: 0,
        totalVotes: 0,
        femaleCount: 0,
        maleCount: 0,
        totalCount: 0
      }
    }
  },

  componentDidMount: function() {
    $.ajax({ url: '/api/stats' })
      .done(function(data) {
        this.setState({ stats: data });
      }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "panel panel-default"}, 
          React.createElement("table", {className: "table table-striped"}, 
            React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", {colSpan: "2"}, "Stats")
            )
            ), 
            React.createElement("tbody", null, 
            React.createElement("tr", null, 
              React.createElement("td", null, "Leading race in Top 100"), 
              React.createElement("td", null, this.state.stats.leadingRace.race, " with ", this.state.stats.leadingRace.count, " characters")
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Leading bloodline in Top 100"), 
              React.createElement("td", null, this.state.stats.leadingBloodline.bloodline, " with ", this.state.stats.leadingBloodline.count, " characters")
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Amarr Characters"), 
              React.createElement("td", null, this.state.stats.amarrCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Caldari Characters"), 
              React.createElement("td", null, this.state.stats.caldariCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Gallente Characters"), 
              React.createElement("td", null, this.state.stats.gallenteCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Minmatar Characters"), 
              React.createElement("td", null, this.state.stats.minmatarCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Total votes cast"), 
              React.createElement("td", null, this.state.stats.totalVotes)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Female characters"), 
              React.createElement("td", null, this.state.stats.femaleCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Male characters"), 
              React.createElement("td", null, this.state.stats.maleCount)
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, "Total number of characters"), 
              React.createElement("td", null, this.state.stats.totalCount)
            )
            )
          )
        )
      )
    );
  }
});

module.exports = Stats;

},{"react":"react"}],12:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var App = require('./components/App');
var Home = require('./components/Home');
var Stats = require('./components/Stats');
var Character = require('./components/Character');
var CharacterList = require('./components/CharacterList');
var AddCharacter = require('./components/AddCharacter');
var RouteNotFound = require('./components/RouteNotFound');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

module.exports = (
  React.createElement(Route, {handler: App}, 
    React.createElement(NotFoundRoute, {handler: RouteNotFound}), 
    React.createElement(Route, {path: "/", handler: Home}), 
    React.createElement(Route, {path: "/stats", handler: Stats}), 
    React.createElement(Route, {path: "/characters/:id", handler: Character}), 
    React.createElement(Route, {path: "/top", handler: CharacterList}, 
      React.createElement(Route, {path: ":race", handler: CharacterList}, 
        React.createElement(Route, {path: ":bloodline", handler: CharacterList})
      )
    ), 
    React.createElement(Route, {path: "/female", handler: CharacterList}, 
      React.createElement(Route, {path: ":race", handler: CharacterList}, 
        React.createElement(Route, {path: ":bloodline", handler: CharacterList})
      )
    ), 
    React.createElement(Route, {path: "/male", handler: CharacterList}, 
      React.createElement(Route, {path: ":race", handler: CharacterList}, 
        React.createElement(Route, {path: ":bloodline", handler: CharacterList})
      )
    ), 
    React.createElement(Route, {path: "/shame", handler: CharacterList}), 
    React.createElement(Route, {path: "/add", handler: AddCharacter})
  )
);

},{"./components/AddCharacter":3,"./components/App":4,"./components/Character":5,"./components/CharacterList":6,"./components/Home":8,"./components/RouteNotFound":10,"./components/Stats":11,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
var alt = require('../alt');

var AddCharacterActions = require('../actions/AddCharacterActions');

var AddCharacterStore = {

  displayName: 'AppStore',

  state: {
    name: '',
    gender: '',
    helpBlock: '',
    nameValidationState: '',
    genderValidationState: ''
  },

  bindListeners: {
    onAddCharacterSuccess: AddCharacterActions.addCharacterSuccess,
    onAddCharacterFail: AddCharacterActions.addCharacterFail,
    onUpdateCharacterName: AddCharacterActions.updateCharacterName
  },

  onAddCharacterSuccess: function(successMessage) {
    this.state.nameValidationState = 'has-success';
    this.state.helpBlock = successMessage;
  },

  onAddCharacterFail: function(errorMessage) {
    this.state.nameValidationState = 'has-error';
    this.state.helpBlock = errorMessage;
  },

  onUpdateCharacterName: function(name) {
    this.setState({
      name: name,
      nameValidationState: '',
      helpBlock: ''
    });
  }

};

module.exports = alt.createStore(AddCharacterStore);

},{"../actions/AddCharacterActions":1,"../alt":2}],14:[function(require,module,exports){
var WebAPIUtils = {
  addCharacter: function(name, gender) {
    return $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    });
  }
};

module.exports = WebAPIUtils;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = makeAction;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var AltAction = (function () {
  function AltAction(alt, name, action, actions, actionDetails) {
    _classCallCheck(this, AltAction);

    this[Sym.ACTION_UID] = name;
    this[Sym.ACTION_HANDLER] = action.bind(this);
    this.actions = actions;
    this.actionDetails = actionDetails;
    this.alt = alt;
  }

  _createClass(AltAction, [{
    key: 'dispatch',
    value: function dispatch(data) {
      this.alt.dispatch(this[Sym.ACTION_UID], data, this.actionDetails);
    }
  }]);

  return AltAction;
})();

function makeAction(alt, namespace, name, implementation, obj) {
  // make sure each Symbol is unique
  var actionId = utils.uid(alt[Sym.ACTIONS_REGISTRY], '' + namespace + '.' + name);
  alt[Sym.ACTIONS_REGISTRY][actionId] = 1;
  var actionSymbol = _esSymbol2['default']['for']('alt/' + actionId);

  var data = {
    namespace: namespace,
    name: name,
    id: actionId,
    symbol: actionSymbol
  };

  // Wrap the action so we can provide a dispatch method
  var newAction = new AltAction(alt, actionSymbol, implementation, obj, data);

  // the action itself
  var action = newAction[Sym.ACTION_HANDLER];
  action.defer = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    setTimeout(function () {
      newAction[Sym.ACTION_HANDLER].apply(null, args);
    });
  };
  action[Sym.ACTION_KEY] = actionSymbol;
  action.data = data;

  // ensure each reference is unique in the namespace
  var container = alt.actions[namespace];
  var id = utils.uid(container, name);
  container[id] = action;

  return action;
}

module.exports = exports['default'];
},{"../symbols/symbols":20,"../utils/AltUtils":21,"es-symbol":23}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _flux = require('flux');

var _utilsStateFunctions = require('./utils/StateFunctions');

var StateFunctions = _interopRequireWildcard(_utilsStateFunctions);

var _symbolsSymbols = require('./symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var _store = require('./store');

var store = _interopRequireWildcard(_store);

var _utilsAltUtils = require('./utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var Alt = (function () {
  function Alt() {
    var config = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Alt);

    this.config = config;
    this.serialize = config.serialize || JSON.stringify;
    this.deserialize = config.deserialize || JSON.parse;
    this.dispatcher = config.dispatcher || new _flux.Dispatcher();
    this.actions = { global: {} };
    this.stores = {};
    this.storeTransforms = config.storeTransforms || [];
    this[Sym.ACTIONS_REGISTRY] = {};
    this[Sym.INIT_SNAPSHOT] = {};
    this[Sym.LAST_SNAPSHOT] = {};
  }

  _createClass(Alt, [{
    key: 'dispatch',
    value: function dispatch(action, data, details) {
      this.dispatcher.dispatch({ action: action, data: data, details: details });
    }
  }, {
    key: 'createUnsavedStore',
    value: function createUnsavedStore(StoreModel) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var key = StoreModel.displayName || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      return fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);
    }
  }, {
    key: 'createStore',
    value: function createStore(StoreModel, iden) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var key = iden || StoreModel.displayName || StoreModel.name || '';
      store.createStoreConfig(this.config, StoreModel);
      var Store = store.transformStore(this.storeTransforms, StoreModel);

      if (this.stores[key] || !key) {
        if (this.stores[key]) {
          utils.warn('A store named ' + key + ' already exists, double check your store ' + 'names or pass in your own custom identifier for each store');
        } else {
          utils.warn('Store name was not specified');
        }

        key = utils.uid(this.stores, key);
      }

      var storeInstance = fn.isFunction(Store) ? store.createStoreFromClass.apply(store, [this, Store, key].concat(args)) : store.createStoreFromObject(this, Store, key);

      this.stores[key] = storeInstance;
      StateFunctions.saveInitialSnapshot(this, key);

      return storeInstance;
    }
  }, {
    key: 'generateActions',
    value: function generateActions() {
      for (var _len3 = arguments.length, actionNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        actionNames[_key3] = arguments[_key3];
      }

      var actions = { name: 'global' };
      return this.createActions(actionNames.reduce(function (obj, action) {
        obj[action] = utils.dispatchIdentity;
        return obj;
      }, actions));
    }
  }, {
    key: 'createAction',
    value: function createAction(name, implementation, obj) {
      return (0, _actions2['default'])(this, 'global', name, implementation, obj);
    }
  }, {
    key: 'createActions',
    value: function createActions(ActionsClass) {
      for (var _len4 = arguments.length, argsForConstructor = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        argsForConstructor[_key4 - 2] = arguments[_key4];
      }

      var _this = this;

      var exportObj = arguments[1] === undefined ? {} : arguments[1];

      var actions = {};
      var key = utils.uid(this[Sym.ACTIONS_REGISTRY], ActionsClass.displayName || ActionsClass.name || 'Unknown');

      if (fn.isFunction(ActionsClass)) {
        (function () {
          fn.assign(actions, utils.getInternalMethods(ActionsClass, true));

          var ActionsGenerator = (function (_ActionsClass) {
            function ActionsGenerator() {
              for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
              }

              _classCallCheck(this, ActionsGenerator);

              _get(Object.getPrototypeOf(ActionsGenerator.prototype), 'constructor', this).apply(this, args);
            }

            _inherits(ActionsGenerator, _ActionsClass);

            _createClass(ActionsGenerator, [{
              key: 'generateActions',
              value: function generateActions() {
                for (var _len6 = arguments.length, actionNames = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  actionNames[_key6] = arguments[_key6];
                }

                actionNames.forEach(function (actionName) {
                  actions[actionName] = utils.dispatchIdentity;
                });
              }
            }]);

            return ActionsGenerator;
          })(ActionsClass);

          fn.assign(actions, new (_bind.apply(ActionsGenerator, [null].concat(argsForConstructor)))());
        })();
      } else {
        fn.assign(actions, ActionsClass);
      }

      this.actions[key] = this.actions[key] || {};

      fn.eachObject(function (actionName, action) {
        if (!fn.isFunction(action)) {
          return;
        }

        // create the action
        exportObj[actionName] = (0, _actions2['default'])(_this, key, actionName, action, exportObj);

        // generate a constant
        var constant = utils.formatAsConstant(actionName);
        exportObj[constant] = exportObj[actionName][Sym.ACTION_KEY];
      }, [actions]);
      return exportObj;
    }
  }, {
    key: 'takeSnapshot',
    value: function takeSnapshot() {
      for (var _len7 = arguments.length, storeNames = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        storeNames[_key7] = arguments[_key7];
      }

      var state = StateFunctions.snapshot(this, storeNames);
      fn.assign(this[Sym.LAST_SNAPSHOT], state);
      return this.serialize(state);
    }
  }, {
    key: 'rollback',
    value: function rollback() {
      StateFunctions.setAppState(this, this.serialize(this[Sym.LAST_SNAPSHOT]), function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('rollback');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'recycle',
    value: function recycle() {
      for (var _len8 = arguments.length, storeNames = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        storeNames[_key8] = arguments[_key8];
      }

      var initialSnapshot = storeNames.length ? StateFunctions.filterSnapshots(this, this[Sym.INIT_SNAPSHOT], storeNames) : this[Sym.INIT_SNAPSHOT];

      StateFunctions.setAppState(this, this.serialize(initialSnapshot), function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('init');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'flush',
    value: function flush() {
      var state = this.serialize(StateFunctions.snapshot(this));
      this.recycle();
      return state;
    }
  }, {
    key: 'bootstrap',
    value: function bootstrap(data) {
      StateFunctions.setAppState(this, data, function (storeInst) {
        storeInst[Sym.LIFECYCLE].emit('bootstrap');
        storeInst.emitChange();
      });
    }
  }, {
    key: 'prepare',
    value: function prepare(storeInst, payload) {
      var data = {};
      if (!storeInst.displayName) {
        throw new ReferenceError('Store provided does not have a name');
      }
      data[storeInst.displayName] = payload;
      return this.serialize(data);
    }
  }, {
    key: 'addActions',

    // Instance type methods for injecting alt into your application as context

    value: function addActions(name, ActionsClass) {
      for (var _len9 = arguments.length, args = Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
        args[_key9 - 2] = arguments[_key9];
      }

      this.actions[name] = Array.isArray(ActionsClass) ? this.generateActions.apply(this, ActionsClass) : this.createActions.apply(this, [ActionsClass].concat(args));
    }
  }, {
    key: 'addStore',
    value: function addStore(name, StoreModel) {
      for (var _len10 = arguments.length, args = Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
        args[_key10 - 2] = arguments[_key10];
      }

      this.createStore.apply(this, [StoreModel, name].concat(args));
    }
  }, {
    key: 'getActions',
    value: function getActions(name) {
      return this.actions[name];
    }
  }, {
    key: 'getStore',
    value: function getStore(name) {
      return this.stores[name];
    }
  }]);

  return Alt;
})();

exports['default'] = Alt;
module.exports = exports['default'];
},{"../utils/functions":28,"./actions":15,"./store":19,"./symbols/symbols":20,"./utils/AltUtils":21,"./utils/StateFunctions":22,"flux":25}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

// event emitter instance
var EE = (0, _esSymbol2['default'])();

var AltStore = (function () {
  function AltStore(alt, model, state, StoreModel) {
    var _this = this;

    _classCallCheck(this, AltStore);

    this[EE] = new _eventemitter32['default']();
    this[Sym.LIFECYCLE] = model[Sym.LIFECYCLE];
    this[Sym.STATE_CONTAINER] = state || model;

    this._storeName = model._storeName;
    this.boundListeners = model[Sym.ALL_LISTENERS];
    this.StoreModel = StoreModel;

    fn.assign(this, model[Sym.PUBLIC_METHODS]);

    // Register dispatcher
    this.dispatchToken = alt.dispatcher.register(function (payload) {
      _this[Sym.LIFECYCLE].emit('beforeEach', payload, _this[Sym.STATE_CONTAINER]);

      if (model[Sym.LISTENERS][payload.action]) {
        var result = false;

        try {
          result = model[Sym.LISTENERS][payload.action](payload.data);
        } catch (e) {
          if (model[Sym.HANDLING_ERRORS]) {
            _this[Sym.LIFECYCLE].emit('error', e, payload, _this[Sym.STATE_CONTAINER]);
          } else {
            throw e;
          }
        }

        if (result !== false) {
          _this.emitChange();
        }
      }

      _this[Sym.LIFECYCLE].emit('afterEach', payload, _this[Sym.STATE_CONTAINER]);
    });

    this[Sym.LIFECYCLE].emit('init');
  }

  _createClass(AltStore, [{
    key: 'getEventEmitter',
    value: function getEventEmitter() {
      return this[EE];
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this[EE].emit('change', this[Sym.STATE_CONTAINER]);
    }
  }, {
    key: 'listen',
    value: function listen(cb) {
      var _this2 = this;

      this[EE].on('change', cb);
      return function () {
        return _this2.unlisten(cb);
      };
    }
  }, {
    key: 'unlisten',
    value: function unlisten(cb) {
      this[Sym.LIFECYCLE].emit('unlisten');
      this[EE].removeListener('change', cb);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.StoreModel.config.getState.call(this, this[Sym.STATE_CONTAINER]);
    }
  }]);

  return AltStore;
})();

exports['default'] = AltStore;
module.exports = exports['default'];
},{"../../utils/functions":28,"../symbols/symbols":20,"es-symbol":23,"eventemitter3":24}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var StoreMixin = {
  waitFor: function waitFor() {
    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }

    if (!sources.length) {
      throw new ReferenceError('Dispatch tokens not provided');
    }

    var sourcesArray = sources;
    if (sources.length === 1) {
      sourcesArray = Array.isArray(sources[0]) ? sources[0] : sources;
    }

    var tokens = sourcesArray.map(function (source) {
      return source.dispatchToken || source;
    });

    this.dispatcher.waitFor(tokens);
  },

  exportAsync: function exportAsync(asyncMethods) {
    this.registerAsync(asyncMethods);
  },

  registerAsync: function registerAsync(asyncDef) {
    var _this = this;

    var loadCounter = 0;

    var asyncMethods = fn.isFunction(asyncDef) ? asyncDef(this.alt) : asyncDef;

    var toExport = Object.keys(asyncMethods).reduce(function (publicMethods, methodName) {
      var desc = asyncMethods[methodName];
      var spec = fn.isFunction(desc) ? desc(_this) : desc;

      var validHandlers = ['success', 'error', 'loading'];
      validHandlers.forEach(function (handler) {
        if (spec[handler] && !spec[handler][Sym.ACTION_KEY]) {
          throw new Error('' + handler + ' handler must be an action function');
        }
      });

      publicMethods[methodName] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var state = _this.getInstance().getState();
        var value = spec.local && spec.local.apply(spec, [state].concat(args));
        var shouldFetch = spec.shouldFetch ? spec.shouldFetch.apply(spec, [state].concat(args)) : value == null;
        var intercept = spec.interceptResponse || function (x) {
          return x;
        };

        // if we don't have it in cache then fetch it
        if (shouldFetch) {
          loadCounter += 1;
          /* istanbul ignore else */
          if (spec.loading) spec.loading(intercept(null, spec.loading, args));
          spec.remote.apply(spec, [state].concat(args)).then(function (v) {
            loadCounter -= 1;
            spec.success(intercept(v, spec.success, args));
          })['catch'](function (v) {
            loadCounter -= 1;
            spec.error(intercept(v, spec.error, args));
          });
        } else {
          // otherwise emit the change now
          _this.emitChange();
        }
      };

      return publicMethods;
    }, {});

    this.exportPublicMethods(toExport);
    this.exportPublicMethods({
      isLoading: function isLoading() {
        return loadCounter > 0;
      }
    });
  },

  exportPublicMethods: function exportPublicMethods(methods) {
    var _this2 = this;

    fn.eachObject(function (methodName, value) {
      if (!fn.isFunction(value)) {
        throw new TypeError('exportPublicMethods expects a function');
      }

      _this2[Sym.PUBLIC_METHODS][methodName] = value;
    }, [methods]);
  },

  emitChange: function emitChange() {
    this.getInstance().emitChange();
  },

  on: function on(lifecycleEvent, handler) {
    if (lifecycleEvent === 'error') {
      this[Sym.HANDLING_ERRORS] = true;
    }
    this[Sym.LIFECYCLE].on(lifecycleEvent, handler.bind(this));
  },

  bindAction: function bindAction(symbol, handler) {
    if (!symbol) {
      throw new ReferenceError('Invalid action reference passed in');
    }
    if (!fn.isFunction(handler)) {
      throw new TypeError('bindAction expects a function');
    }

    if (handler.length > 1) {
      throw new TypeError('Action handler in store ' + this._storeName + ' for ' + ('' + (symbol[Sym.ACTION_KEY] || symbol).toString() + ' was defined with ') + 'two parameters. Only a single parameter is passed through the ' + 'dispatcher, did you mean to pass in an Object instead?');
    }

    // You can pass in the constant or the function itself
    var key = symbol[Sym.ACTION_KEY] ? symbol[Sym.ACTION_KEY] : symbol;
    this[Sym.LISTENERS][key] = handler.bind(this);
    this[Sym.ALL_LISTENERS].push(_esSymbol2['default'].keyFor(key));
  },

  bindActions: function bindActions(actions) {
    var _this3 = this;

    fn.eachObject(function (action, symbol) {
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return 'on' + x[0].toUpperCase();
      });
      var handler = null;

      if (_this3[action] && _this3[assumedEventHandler]) {
        // If you have both action and onAction
        throw new ReferenceError('You have multiple action handlers bound to an action: ' + ('' + action + ' and ' + assumedEventHandler));
      } else if (_this3[action]) {
        // action
        handler = _this3[action];
      } else if (_this3[assumedEventHandler]) {
        // onAction
        handler = _this3[assumedEventHandler];
      }

      if (handler) {
        _this3.bindAction(symbol, handler);
      }
    }, [actions]);
  },

  bindListeners: function bindListeners(obj) {
    var _this4 = this;

    fn.eachObject(function (methodName, symbol) {
      var listener = _this4[methodName];

      if (!listener) {
        throw new ReferenceError('' + methodName + ' defined but does not exist in ' + _this4._storeName);
      }

      if (Array.isArray(symbol)) {
        symbol.forEach(function (action) {
          _this4.bindAction(action, listener);
        });
      } else {
        _this4.bindAction(symbol, listener);
      }
    }, [obj]);
  }
};

exports['default'] = StoreMixin;
module.exports = exports['default'];
},{"../../utils/functions":28,"../symbols/symbols":20,"es-symbol":23}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.createStoreConfig = createStoreConfig;
exports.transformStore = transformStore;
exports.createStoreFromObject = createStoreFromObject;
exports.createStoreFromClass = createStoreFromClass;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsAltUtils = require('../utils/AltUtils');

var utils = _interopRequireWildcard(_utilsAltUtils);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

var _AltStore = require('./AltStore');

var _AltStore2 = _interopRequireDefault(_AltStore);

var _StoreMixin = require('./StoreMixin');

var _StoreMixin2 = _interopRequireDefault(_StoreMixin);

function doSetState(store, storeInstance, state) {
  if (!state) {
    return;
  }

  var config = storeInstance.StoreModel.config;

  var nextState = fn.isFunction(state) ? state(storeInstance[Sym.STATE_CONTAINER]) : state;

  storeInstance[Sym.STATE_CONTAINER] = config.setState.call(store, storeInstance[Sym.STATE_CONTAINER], nextState);

  if (!store.alt.dispatcher.isDispatching()) {
    store.emitChange();
  }
}

function createPrototype(proto, alt, key, extras) {
  proto[Sym.ALL_LISTENERS] = [];
  proto[Sym.LIFECYCLE] = new _eventemitter32['default']();
  proto[Sym.LISTENERS] = {};
  proto[Sym.PUBLIC_METHODS] = {};

  return fn.assign(proto, _StoreMixin2['default'], {
    _storeName: key,
    alt: alt,
    dispatcher: alt.dispatcher
  }, extras);
}

function createStoreConfig(globalConfig, StoreModel) {
  StoreModel.config = fn.assign({
    getState: function getState(state) {
      return fn.assign({}, state);
    },
    setState: fn.assign
  }, globalConfig, StoreModel.config);
}

function transformStore(transforms, StoreModel) {
  return transforms.reduce(function (Store, transform) {
    return transform(Store);
  }, StoreModel);
}

function createStoreFromObject(alt, StoreModel, key) {
  var storeInstance = undefined;

  var StoreProto = createPrototype({}, alt, key, fn.assign({
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  }, StoreModel));

  // bind the store listeners
  /* istanbul ignore else */
  if (StoreProto.bindListeners) {
    _StoreMixin2['default'].bindListeners.call(StoreProto, StoreProto.bindListeners);
  }

  // bind the lifecycle events
  /* istanbul ignore else */
  if (StoreProto.lifecycle) {
    fn.eachObject(function (eventName, event) {
      _StoreMixin2['default'].on.call(StoreProto, eventName, event);
    }, [StoreProto.lifecycle]);
  }

  // create the instance and fn.assign the public methods to the instance
  storeInstance = fn.assign(new _AltStore2['default'](alt, StoreProto, StoreProto.state, StoreModel), StoreProto.publicMethods, { displayName: key });

  return storeInstance;
}

function createStoreFromClass(alt, StoreModel, key) {
  for (var _len = arguments.length, argsForClass = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    argsForClass[_key - 3] = arguments[_key];
  }

  var storeInstance = undefined;
  var config = StoreModel.config;

  // Creating a class here so we don't overload the provided store's
  // prototype with the mixin behaviour and I'm extending from StoreModel
  // so we can inherit any extensions from the provided store.

  var Store = (function (_StoreModel) {
    function Store() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _classCallCheck(this, Store);

      _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).apply(this, args);
    }

    _inherits(Store, _StoreModel);

    return Store;
  })(StoreModel);

  createPrototype(Store.prototype, alt, key, {
    getInstance: function getInstance() {
      return storeInstance;
    },
    setState: function setState(nextState) {
      doSetState(this, storeInstance, nextState);
    }
  });

  var store = new (_bind.apply(Store, [null].concat(argsForClass)))();

  if (config.bindListeners) {
    store.bindListeners(config.bindListeners);
  }

  if (config.datasource) {
    store.exportAsync(config.datasource);
  }

  storeInstance = fn.assign(new _AltStore2['default'](alt, store, store[alt.config.stateKey] || store[config.stateKey] || null, StoreModel), utils.getInternalMethods(StoreModel), config.publicMethods, { displayName: key });

  return storeInstance;
}
},{"../../utils/functions":28,"../symbols/symbols":20,"../utils/AltUtils":21,"./AltStore":17,"./StoreMixin":18,"eventemitter3":24}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _esSymbol = require('es-symbol');

var _esSymbol2 = _interopRequireDefault(_esSymbol);

// action creator handler
var ACTION_HANDLER = (0, _esSymbol2['default'])();

exports.ACTION_HANDLER = ACTION_HANDLER;
// the action's uid symbol for listening
var ACTION_KEY = (0, _esSymbol2['default'])();

exports.ACTION_KEY = ACTION_KEY;
// per instance registry of actions
var ACTIONS_REGISTRY = (0, _esSymbol2['default'])();

exports.ACTIONS_REGISTRY = ACTIONS_REGISTRY;
// the action's name
var ACTION_UID = (0, _esSymbol2['default'])();

exports.ACTION_UID = ACTION_UID;
// store all of a store's listeners
var ALL_LISTENERS = (0, _esSymbol2['default'])();

exports.ALL_LISTENERS = ALL_LISTENERS;
// are we handling our own errors
var HANDLING_ERRORS = (0, _esSymbol2['default'])();

exports.HANDLING_ERRORS = HANDLING_ERRORS;
// initial snapshot
var INIT_SNAPSHOT = (0, _esSymbol2['default'])();

exports.INIT_SNAPSHOT = INIT_SNAPSHOT;
// last snapshot
var LAST_SNAPSHOT = (0, _esSymbol2['default'])();

exports.LAST_SNAPSHOT = LAST_SNAPSHOT;
// all lifecycle listeners
var LIFECYCLE = (0, _esSymbol2['default'])();

exports.LIFECYCLE = LIFECYCLE;
// store action listeners
var LISTENERS = (0, _esSymbol2['default'])();

exports.LISTENERS = LISTENERS;
// public methods
var PUBLIC_METHODS = (0, _esSymbol2['default'])();

exports.PUBLIC_METHODS = PUBLIC_METHODS;
// contains all state
var STATE_CONTAINER = (0, _esSymbol2['default'])();
exports.STATE_CONTAINER = STATE_CONTAINER;
},{"es-symbol":23}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getInternalMethods = getInternalMethods;
exports.warn = warn;
exports.uid = uid;
exports.formatAsConstant = formatAsConstant;
exports.dispatchIdentity = dispatchIdentity;
/* istanbul ignore next */
function NoopClass() {}

var builtIns = Object.getOwnPropertyNames(NoopClass);
var builtInProto = Object.getOwnPropertyNames(NoopClass.prototype);

function getInternalMethods(Obj, isProto) {
  var excluded = isProto ? builtInProto : builtIns;
  var obj = isProto ? Obj.prototype : Obj;
  return Object.getOwnPropertyNames(obj).reduce(function (value, m) {
    if (excluded.indexOf(m) !== -1) {
      return value;
    }

    value[m] = obj[m];
    return value;
  }, {});
}

function warn(msg) {
  /* istanbul ignore else */
  if (typeof console !== 'undefined') {
    console.warn(new ReferenceError(msg));
  }
}

function uid(container, name) {
  var count = 0;
  var key = name;
  while (Object.hasOwnProperty.call(container, key)) {
    key = name + String(++count);
  }
  return key;
}

function formatAsConstant(name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return '' + i[0] + '_' + i[1].toLowerCase();
  }).toUpperCase();
}

function dispatchIdentity(x) {
  for (var _len = arguments.length, a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    a[_key - 1] = arguments[_key];
  }

  this.dispatch(a.length ? [x].concat(a) : x);
}
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setAppState = setAppState;
exports.snapshot = snapshot;
exports.saveInitialSnapshot = saveInitialSnapshot;
exports.filterSnapshots = filterSnapshots;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _symbolsSymbols = require('../symbols/symbols');

var Sym = _interopRequireWildcard(_symbolsSymbols);

var _utilsFunctions = require('../../utils/functions');

var fn = _interopRequireWildcard(_utilsFunctions);

function setAppState(instance, data, onStore) {
  var obj = instance.deserialize(data);
  fn.eachObject(function (key, value) {
    var store = instance.stores[key];
    if (store) {
      var config = store.StoreModel.config;

      if (config.onDeserialize) {
        obj[key] = config.onDeserialize(value) || value;
      }
      fn.assign(store[Sym.STATE_CONTAINER], obj[key]);
      onStore(store);
    }
  }, [obj]);
}

function snapshot(instance) {
  var storeNames = arguments[1] === undefined ? [] : arguments[1];

  var stores = storeNames.length ? storeNames : Object.keys(instance.stores);
  return stores.reduce(function (obj, storeHandle) {
    var storeName = storeHandle.displayName || storeHandle;
    var store = instance.stores[storeName];
    var config = store.StoreModel.config;

    store[Sym.LIFECYCLE].emit('snapshot');
    var customSnapshot = config.onSerialize && config.onSerialize(store[Sym.STATE_CONTAINER]);
    obj[storeName] = customSnapshot ? customSnapshot : store.getState();
    return obj;
  }, {});
}

function saveInitialSnapshot(instance, key) {
  var state = instance.deserialize(instance.serialize(instance.stores[key][Sym.STATE_CONTAINER]));
  instance[Sym.INIT_SNAPSHOT][key] = state;
  instance[Sym.LAST_SNAPSHOT][key] = state;
}

function filterSnapshots(instance, state, stores) {
  return stores.reduce(function (obj, store) {
    var storeName = store.displayName || store;
    if (!state[storeName]) {
      throw new ReferenceError('' + storeName + ' is not a valid store');
    }
    obj[storeName] = state[storeName];
    return obj;
  }, {});
}
},{"../../utils/functions":28,"../symbols/symbols":20}],23:[function(require,module,exports){
"use strict";

var globalSymbolRegistryList = {};

// Aliases & Helpers
var make = Object.create;
var defProps = Object.defineProperties;
var defProp = Object.defineProperty;
var defValue = function (value) {
  var opts = arguments[1] === undefined ? {} : arguments[1];
  return {
    value: value,
    configurable: !!opts.c,
    writable: !!opts.w,
    enumerable: !!opts.e
  };
};
var isSymbol = function (symbol) {
  return symbol && symbol[xSymbol.toStringTag] === "Symbol";
};

var supportsAccessors = undefined;
try {
  var x = defProp({}, "y", { get: function () {
      return 1;
    } });
  supportsAccessors = x.y === 1;
} catch (e) {
  supportsAccessors = false;
}

var id = {};
var uid = function (desc) {
  desc = String(desc);
  var x = "";
  var i = 0;
  while (id[desc + x]) {
    x = i += 1;
  }
  id[desc + x] = 1;

  var tag = "Symbol(" + desc + "" + x + ")";

  /* istanbul ignore else */
  if (supportsAccessors) {
    // Make the symbols hidden to pre-es6 code
    defProp(Object.prototype, tag, {
      get: undefined,
      set: function (value) {
        defProp(this, tag, defValue(value, { c: true, w: true }));
      },
      configurable: true,
      enumerable: false
    });
  }

  return tag;
};

// The base symbol
var SymbolProto = make(null);

// 19.4.1.1
function xSymbol(descString) {
  if (this instanceof xSymbol) {
    throw new TypeError("Symbol is not a constructor");
  }

  descString = descString === undefined ? "" : String(descString);

  var tag = uid(descString);

  /* istanbul ignore next */
  if (!supportsAccessors) {
    return tag;
  }

  return make(SymbolProto, {
    __description__: defValue(descString),
    __tag__: defValue(tag)
  });
}

defProps(xSymbol, {
  // 19.4.2.1
  "for": defValue(function (key) {
    var stringKey = String(key);

    if (globalSymbolRegistryList[stringKey]) {
      return globalSymbolRegistryList[stringKey];
    }

    var symbol = xSymbol(stringKey);
    globalSymbolRegistryList[stringKey] = symbol;

    return symbol;
  }),

  // 19.4.2.5
  keyFor: defValue(function (sym) {
    if (supportsAccessors && !isSymbol(sym)) {
      throw new TypeError("" + sym + " is not a symbol");
    }

    for (var key in globalSymbolRegistryList) {
      if (globalSymbolRegistryList[key] === sym) {
        return supportsAccessors ? globalSymbolRegistryList[key].__description__ : globalSymbolRegistryList[key].substr(7, globalSymbolRegistryList[key].length - 8);
      }
    }
  })
});

// 6.1.5.1
defProps(xSymbol, {
  hasInstance: defValue(xSymbol("hasInstance")),
  isConcatSpreadable: defValue(xSymbol("isConcatSpreadable")),
  iterator: defValue(xSymbol("iterator")),
  match: defValue(xSymbol("match")),
  replace: defValue(xSymbol("replace")),
  search: defValue(xSymbol("search")),
  species: defValue(xSymbol("species")),
  split: defValue(xSymbol("split")),
  toPrimitive: defValue(xSymbol("toPrimitive")),
  toStringTag: defValue(xSymbol("toStringTag")),
  unscopables: defValue(xSymbol("unscopables"))
});

// 19.4.3
defProps(SymbolProto, {
  constructor: defValue(xSymbol),

  // 19.4.3.2
  toString: defValue(function () {
    return this.__tag__;
  }),

  // 19.4.3.3
  valueOf: defValue(function () {
    return "Symbol(" + this.__description__ + ")";
  })
});

// 19.4.3.5
/* istanbul ignore else */
if (supportsAccessors) {
  defProp(SymbolProto, xSymbol.toStringTag, defValue("Symbol", { c: true }));
}

module.exports = typeof Symbol === "function" ? Symbol : xSymbol;


},{}],24:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],25:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher')

},{"./lib/Dispatcher":26}],26:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = require('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":27}],27:[function(require,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.eachObject = eachObject;
exports.assign = assign;
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

exports.isFunction = isFunction;

function eachObject(f, o) {
  o.forEach(function (from) {
    Object.keys(Object(from)).forEach(function (key) {
      f(key, from[key]);
    });
  });
}

function assign(target) {
  for (var _len = arguments.length, source = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    source[_key - 1] = arguments[_key];
  }

  eachObject(function (key, value) {
    return target[key] = value;
  }, source);
  return target;
}
},{}],29:[function(require,module,exports){
var React = require('react');
var Router = require('react-router');

var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(React.createElement(Handler, null), document);
});

},{"./routes":12,"react":"react","react-router":"react-router"}]},{},[29]);
