var React = require('react');
var Router = require('react-router');

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

  componentDidMount: function() {
    this.fetchCharacters();
    this.setState({
      path: this.context.router.getCurrentPath()
    });
  },


  componentDidUpdate: function() {
    var currentPath = this.context.router.getCurrentPath();

    if (this.state.path === currentPath) {
      return;
    }
    this.fetchCharacters();
    this.setState({
      path: currentPath
    });
  },

  render: function() {
    console.log();
    console.log(this.context.router.getCurrentParams());

    var characterList = this.state.characters.map(function(character, index) {
      return (
        <div key={character.characterId} className='list-group-item clearfix'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>

            <div className='pull-left thumb-lg'>
              <a href={'/characters/' + character.characterId}>
                <img className='media-object' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'}/>
              </a>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <a href={'/characters/' + character.characterId}>{character.name}</a>
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