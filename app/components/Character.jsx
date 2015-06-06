var _ = require('underscore');
var React = require('react');

var Character = React.createClass({
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
      <div className='text-center animated fadeIn'>
        Thank you for subscribing!
      </div>
    ) : (
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-3'>
          <form onSubmit={this.handleSubscribeSubmit}>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Email' onChange={this.handleSubscribeChange}/>
                <span className='input-group-btn'>
                  <button className='btn btn-default' onClick={this.handleSubscribeSubmit}>
                    Subscribe
                  </button>
                </span>
            </div>
          </form>
        </div>
      </div>
    );

    var reportButton = this.state.reported ? (
      <button className='btn btn-transparent' disabled>Reported</button>
    ) : (
      <button className='btn btn-transparent' onClick={this.handleReportCharacter}>Report Character</button>
    );

    return (
      <div ref='container' className='container animated fadeIn'>
        <div className='profile-img'>
          <a className='magnific-popup' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
            <img src={'https://image.eveonline.com/Character/' + this.state.characterId + '_256.jpg'}/>
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.name}</strong></h2>
          <h4 className='lead'>Race: <strong>{this.state.race}</strong></h4>
          <h4 className='lead'>Bloodline: <strong>{this.state.bloodline}</strong></h4>
          <h4 className='lead'>Gender: <strong>{this.state.gender}</strong></h4>
          {reportButton}
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>
        <div className='row'>
          <div className='col-sm-12 text-center'>
            <h4 className='lead'> Subscribe for weekly statistics on <strong>{this.state.name}</strong></h4>
          </div>
        </div>
        {subscribeField}
      </div>
    );
  }
});

module.exports = Character;