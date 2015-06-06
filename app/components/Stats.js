import React from 'react';

class Stats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stats: {
        leadingRace: { race: 'TBD', count: 0 },
        leadingBloodline: { bloodline: 'TBD', count: 0 },
        amarrCount: 0,
        caldariCount: 0,
        gallenteCount: 0,
        minmatarCount: 0,
        totalVotes: 0,
        femaleCount: 0,
        maleCount: 0,
        totalCount: 0
      }
    }
  }

  componentDidMount() {
    $.ajax({ url: '/api/stats' })
      .done(function(data) {
        this.setState({ stats: data });
      }.bind(this));
  }

  render() {
    return (
      <div className='container'>
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
              <td>{this.state.stats.leadingRace.race} with {this.state.stats.leadingRace.count} characters</td>
            </tr>
            <tr>
              <td>Leading bloodline in Top 100</td>
              <td>{this.state.stats.leadingBloodline.bloodline} with {this.state.stats.leadingBloodline.count} characters</td>
            </tr>
            <tr>
              <td>Amarr Characters</td>
              <td>{this.state.stats.amarrCount}</td>
            </tr>
            <tr>
              <td>Caldari Characters</td>
              <td>{this.state.stats.caldariCount}</td>
            </tr>
            <tr>
              <td>Gallente Characters</td>
              <td>{this.state.stats.gallenteCount}</td>
            </tr>
            <tr>
              <td>Minmatar Characters</td>
              <td>{this.state.stats.minmatarCount}</td>
            </tr>
            <tr>
              <td>Total votes cast</td>
              <td>{this.state.stats.totalVotes}</td>
            </tr>
            <tr>
              <td>Female characters</td>
              <td>{this.state.stats.femaleCount}</td>
            </tr>
            <tr>
              <td>Male characters</td>
              <td>{this.state.stats.maleCount}</td>
            </tr>
            <tr>
              <td>Total number of characters</td>
              <td>{this.state.stats.totalCount}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Stats;