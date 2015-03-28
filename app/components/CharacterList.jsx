var React = require('react');

var CharacterList = React.createClass({

  getInitialState: function() {
    return {
      characters: []
    }
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    $.get('/api/characters/top', function(data) {
      this.setState({ characters: data });
    }.bind(this));
  },

  render: function() {
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