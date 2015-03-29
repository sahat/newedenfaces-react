var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var CharacterList = React.createClass({

  getInitialState: function() {
    return {
      characters: []
    }
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
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
        <div key={character.characterId} className='list-group-item clearfix'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>

            <div className='pull-left thumb-lg'>
              <Link to={'/characters/' + character.characterId}>
                <img className='media-object' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'}/>
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/characters/' + character.characterId}>{character.name}</Link>
              </h4>
              <small>Race: <strong>{character.race}</strong></small>
              <br />
              <small>Bloodline: <strong>{character.bloodline}</strong></small>
              <br />
              <small>Wins: <strong>{character.wins}</strong> Losses: <strong>{character.losses}</strong></small>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='list-group'>
        {characterList}
      </div>
    );
  }
});

module.exports = CharacterList;