var React = require('react');


var Character = React.createClass({

  getInitialState: function() {
    return {
      characterId: 0,
      race: 'TBD',
      bloodline: 'TBD',
      gender: 'TBD',
      wins: 10,
      losses: 5,
      winLossRatio: 54
    }
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    var routeParams = this.context.router.getCurrentParams();

    $.get('/api/characters/' + routeParams.id, function(data) {
      document.body.classList.add('profile');
      document.body.classList.add(data.race.toLowerCase());

      var winLossRatio = (data.wins / (data.wins + data.losses) * 100).toFixed(1);

      if (isNaN(winLossRatio)) {
        winLossRatio = 0;
      }

      this.setState({
        characterId: data.characterId,
        race: data.race,
        bloodline: data.bloodline,
        gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
        wins: data.wins,
        losses: data.losses,
        winLossRatio: winLossRatio
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    console.log('bye');
    document.body.classList.remove('profile');
    document.body.classList.remove(this.state.race.toLowerCase());

  },

  render: function() {
    return (
      <div className='container'>
        <div className='profile-img'>
          <a className='magnific-popup fade-zoom' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
            <img src={'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg'}/>
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2>{this.state.name}</h2>
          <h4 className='lead'>Race: <strong>{this.state.race}</strong></h4>
          <h4 className='lead'>Bloodline: <strong>{this.state.bloodline}</strong></h4>
          <h4 className='lead'>Gender: <strong>{this.state.gender}</strong></h4>
          <div className="btn-group">
            <button className='btn btn-transparent'>Request to Delete</button>
            <button className='btn btn-transparent'>Wrong Gender</button>
          </div>
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span> Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Character;