var React = require('react');

var Stats = React.createClass({
  getInitialState: function() {
    return {
      leadingRace: { race: '', count: 0 },
      leadingBloodline: { race: '', count: 0 },
      amarrCount: 0,
      caldariCount: 0,
      gallenteCount: 0,
      minmatarCount: 0,
      totalVotes: 0,
      femaleCount: 0,
      maleCount: 0,
      totalCount: 0
    }
  },

  componentDidMount: function() {
    $.get('/api/stats', function(data) {
      this.setState(data);
    }.bind(this));
  },

  render: function() {
    return (
      <div className='panel panel-default'>
        <table className='table table-striped'>
          <thead>
          <tr>
            <th colSpan='2'>Stats</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Leading race in Top 100</td>
            <td>{this.state.leadingRace.race} with {this.state.leadingRace.count} characters</td>
          </tr>
          <tr>
            <td>Leading bloodline in Top 100</td>
            <td>{this.state.leadingBloodline.bloodline} with {this.state.leadingBloodline.count} characters</td>
          </tr>
          <tr>
            <td>Amarr Characters</td>
            <td>{this.state.amarrCount}</td>
          </tr>
          <tr>
            <td>Caldari Characters</td>
            <td>{this.state.caldariCount}</td>
          </tr>
          <tr>
            <td>Gallente Characters</td>
            <td>{this.state.gallenteCount}</td>
          </tr>
          <tr>
            <td>Minmatar Characters</td>
            <td>{this.state.minmatarCount}</td>
          </tr>
          <tr>
            <td>Total votes cast</td>
            <td>{this.state.totalVotes}</td>
          </tr>
          <tr>
            <td>Female characters</td>
            <td>{this.state.femaleCount}</td>
          </tr>
          <tr>
            <td>Male characters</td>
            <td>{this.state.maleCount}</td>
          </tr>
          <tr>
            <td>Total number of characters</td>
            <td>{this.state.totalCount}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Stats;