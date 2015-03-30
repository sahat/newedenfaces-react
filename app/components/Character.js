var React = require('react');


var Character = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

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

  componentDidMount: function() {
    this.setState({ path: this.context.router.getCurrentPath() });

    this.getCharacter()
      .done(function(data) {
        document.body.classList.add('profile');
        document.body.classList.add('profile-' + data.race.toLowerCase());

        this.setState({
          characterId: data.characterId,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio
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

        this.setState({
          characterId: data.characterId,
          race: data.race,
          bloodline: data.bloodline,
          gender: data.gender.charAt(0).toUpperCase() + data.gender.substring(1),
          wins: data.wins,
          losses: data.losses,
          winLossRatio: data.winLossRatio
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

  render: function() {
    return (
      <div ref='container' className='container animated fadeIn'>
        <div className='profile-img'>
          <a className='magnific-popup' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
            <img src={'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg'}/>
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2>{this.state.name}</h2>
          <h4 className='lead'>Race: <strong>{this.state.race}</strong></h4>
          <h4 className='lead'>Bloodline: <strong>{this.state.bloodline}</strong></h4>
          <h4 className='lead'>Gender: <strong>{this.state.gender}</strong></h4>

          <div className='btn-group'>
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