var React = require('react');

var RouteNotFound = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <h1>Page Not Found</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>
    );
  }
});

module.exports = RouteNotFound;