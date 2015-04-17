var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var AddCharacter = React.createClass({

  getInitialState: function() {
    return {
      name: '',
      gender: '',
      helpBlock: '',
      nameValidationState: '',
      genderValidationState: ''
    }
  },

  componentDidMount: function() {
    AppStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    AppStore.unlisten(this.onChange);
  },

  onChange: function() {
    var state = AppStore.getState();

    this.setState({
      nameValidationState: state.nameValidationState,
      helpBlock: state.helpBlock
    });
  },

  handleNameChange: function(event) {
    this.setState({
      name: event.target.value,
      nameValidationState: '',
      helpBlock: ''
    });
  },

  handleGenderChange: function(event) {
    this.setState({
      gender: event.target.value,
      genderValidationState: ''
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    if (!name) {
      this.refs.nameInput.getDOMNode().focus();
      this.setState({
        nameValidationState: 'has-error',
        helpBlock: 'Please enter a character name.'
      });
      return;
    }

    if (!gender) {
      this.setState({
        genderValidationState: 'has-error'
      });
      return;
    }

    AppActions.addCharacter(name, gender);

    //
    //xhr.done(function(data) {
    //  this.refs.nameFormGroup.getDOMNode().classList.add('has-success');
    //  this.setState({ helpBlock: data.message });
    //}.bind(this));
    //
    //xhr.fail(function(jqXhr) {
    //  this.refs.nameFormGroup.getDOMNode().classList.add('has-error');
    //  this.setState({ helpBlock: jqXhr.responseJSON.message });
    //}.bind(this));
    //
    //xhr.always(function() {
    //  this.setState({ name: '', gender: '' });
    //  this.refs.nameInput.getDOMNode().focus();
    //}.bind(this));
  },
  render: function() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Character</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit}>
                  <div className={'form-group ' + this.state.nameValidationState}>
                    <label className='control-label'>Character Name</label>
                    <input type='text' className='form-control' ref='nameInput' value={this.state.name} onChange={this.handleNameChange} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.genderValidationState}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='female' value='female' checked={this.state.gender === 'female'} onChange={this.handleGenderChange}/>
                      <label htmlFor='female'>Female</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='male' value='male' checked={this.state.gender === 'male'} onChange={this.handleGenderChange}/>
                      <label htmlFor='male'>Male</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddCharacter;