var React = require('react');

var CharacterList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  onChange: function() {
    this.context.router.replaceWith('/');
  },

  render: function() {
    console.log(this.context.router.getCurrentParams());
    return (
      <div id='container'>
        CHARACTR LIST
        <h1>{this.context.router.getCurrentParams()}</h1>
      </div>
    );
  }
});

module.exports = CharacterList;