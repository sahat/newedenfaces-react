var React = require('react');

var Home = React.createClass({

  getInitialState: function() {
    return {
      characters: []
    }
  },

  componentDidMount: function() {
    $.get('/api/characters', function(data) {
      this.setState({ characters: data });
    }.bind(this));
  },

  render: function() {
    var characterNodes = this.state.characters.map(function(character, index) {
      return (
        <div className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <img src={'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg'} />
            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong>Race:</strong> {character.race}</li>
                <li><strong>Bloodline:</strong> {character.bloodline}</li>
              </ul>
              <h4>
                <a href={'/characters/' + character.characterId}><strong>{character.name}</strong></a>
              </h4>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>Click on the portrait. Select your favorite.</h3>
        <div className='row'>
          {characterNodes}
        </div>
      </div>
    );
  }
});

module.exports = Home;