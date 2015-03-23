var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <div className="container">
          <h3><strong>Information</strong> and <strong>Copyright</strong></h3>
          <p>© 2015 Sahat Yalkabov.</p>
          <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong>.</p>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;