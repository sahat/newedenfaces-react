var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div id='container'>
        <nav>
          <ul>
            <li><a href=''>Feedback</a></li>
            <li><a href=''>Options</a></li>
            <li><a href=''>Login</a></li>
            <li><a href=''>Register</a></li>
          </ul>
        </nav>
      </div>
    );
  }
});

module.exports = App;