var React = require('react');

var Stats = React.createClass({
  getDefaultProps: function() {
    return {
      leadingRace: {
        race: 'Caldari',
        count: 0
      },
      leadingBloodline: {
        race: 'Amarr',
        count: 3
      },
      amarrCount: 1,
      caldariCount: 2,
      gallenteCount: 3,
      minmatarCount: 4,
      totalVotes: 111,
      femaleCount: 2,
      maleCount: 1,
      totalCount: 99
    }
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
            <td>{this.props.leadingRace.race} with {this.props.leadingRace.count} characters</td>
          </tr>
          <tr>
            <td>Leading bloodline in Top 100</td>
            <td>{this.props.leadingBloodline.bloodline} with {this.props.leadingBloodline.count} characters</td>
          </tr>
          <tr>
            <td>Amarr Characters</td>
            <td>{this.props.amarrCount}</td>
          </tr>
          <tr>
            <td>Caldari Characters</td>
            <td>{this.props.caldariCount}</td>
          </tr>
          <tr>
            <td>Gallente Characters</td>
            <td>{this.props.gallenteCount}</td>
          </tr>
          <tr>
            <td>Minmatar Characters</td>
            <td>{this.props.minmatarCount}</td>
          </tr>
          <tr>
            <td>Total votes cast</td>
            <td>{this.props.totalVotes}</td>
          </tr>
          <tr>
            <td>Female characters</td>
            <td>{this.props.femaleCount}</td>
          </tr>
          <tr>
            <td>Male characters</td>
            <td>{this.props.maleCount}</td>
          </tr>
          <tr>
            <td>Total number of characters</td>
            <td>{this.props.totalCount}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Stats;