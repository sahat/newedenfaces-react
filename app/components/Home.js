var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

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

  handleClick: function(character) {
    var winner = character;
    var loser = this.state.characters[1 - this.state.characters.indexOf(winner)];

    $.ajax({
      type: 'PUT',
      url: '/api/characters',
      data: { winner: winner.characterId, loser: loser.characterId },
      success: function() {
        $.get('/api/characters', function(data) {
          this.setState({ characters: data });
        }.bind(this));
      }.bind(this)
    });
  },

  render: function() {
    var characterNodes = this.state.characters.map(function(character, index) {
      return (
        <div key={character.characterId} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <img onClick={this.handleClick.bind(this, character)} src={'http://image.eveonline.com/Character/' + character.characterId + '_512.jpg'}/>

            <div className='caption text-center'>
              <ul className='list-inline'>
                <li><strong>Race:</strong> {character.race}</li>
                <li><strong>Bloodline:</strong> {character.bloodline}</li>
              </ul>
              <h4>
                <Link to={'/characters/' + character.characterId}><strong>{character.name}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
      );
    }.bind(this));

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