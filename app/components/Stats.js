import React from 'react';
import StatsStore from '../stores/StatsStore'
import StatsActions from '../actions/StatsActions';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = StatsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    StatsStore.listen(this.onChange);
    StatsActions.getStats();
  }

  componentWillUnmount() {
    StatsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
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
              <td>{this.state.leadingRace.race} with {this.state.leadingRace.count} characters</td>
            </tr>
            <tr>
              <td>Leading bloodline in Top 100</td>
              <td>{this.state.leadingBloodline.bloodline} with {this.state.leadingBloodline.count} characters
              </td>
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
      </div>
    );
  }
}

export default Stats;