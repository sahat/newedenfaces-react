var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Footer = React.createClass({

  getInitialState: function() {
    return {
      characters: []
    }
  },

  componentDidMount: function() {
    $.get('/api/leaderboard', function(data) {
      this.setState({ characters: data });
    }.bind(this));
  },

  render: function() {
    var leaderboardCharacters = this.state.characters.map(function(character) {
      return (
        <li key={character.characterId}>
          <Link to={'/characters/' + character.characterId}>
            <img className='thumb-md' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
          </Link>
        </li>
      )
    });

    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong>.</p>
              <p>You may view the <a href='https://github.com/sahat/newedenfaces-react'>Source Code</a> behind this project on GitHub</p>
              <p>© 2015 Sahat Yalkabov.</p>
            </div>
            <div className='col-sm-7 hidden-xs'>
              <h3 className='lead'><strong>Leaderboard</strong> Top 5 Characters</h3>
              <ul className='list-inline'>
                {leaderboardCharacters}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;