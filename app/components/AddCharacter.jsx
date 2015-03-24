var React = require('react');

var AddCharacter = React.createClass({

  getInitialState: function() {
    return {
      helpBlock: ''
    }
  },

  handleNameChange: function(event) {
    if (event.target.parentNode.classList.contains('has-success')) {
      event.target.parentNode.classList.remove('has-success');
      this.setState({ helpBlock: '' });
    }
    this.setState({ name: event.target.value })
  },

  handleGenderChange: function(event) {
    this.setState({ gender: event.target.value })
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    }).done(function() {
      this.refs.name.getDOMNode().value = '';
      this.refs.name.getDOMNode().focus();
      this.refs.name.getDOMNode().parentNode.classList.add('has-success');
      this.setState({ helpBlock: name + ' has been added successfully!' });
    }.bind(this));
  },

  render: function() {
    return (
      <div className="row flipInX animated">
        <div className="col-sm-8">
          <div className='panel panel-default'>
            <div className='panel-heading font-bold'>Add Character</div>
            <div className='panel-body'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label className='control-label'>Character Name</label>
                  <input type='text' className='form-control' ref='name' onChange={this.handleNameChange} autoFocus/>
                  <span className="help-block">{this.state.helpBlock}</span>
                </div>
                <div className='form-group'>
                  <div className='radio radio-inline'>
                    <input type='radio' name='gender' id='female' value='female' onChange={this.handleGenderChange}/>
                    <label htmlFor='female'>Female</label>
                  </div>
                  <div className='radio radio-inline'>
                    <input type='radio' name='gender' id='male' value='male' onChange={this.handleGenderChange}/>
                    <label htmlFor='male'>Male</label>
                  </div>
                </div>
                <button type='submit' className='btn btn-primary'>Success</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddCharacter;