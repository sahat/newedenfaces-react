var alt = require('../alt');

var AddCharacterActions = require('../actions/AddCharacterActions');

var AddCharacterStore = {

  displayName: 'AppStore',

  state: {
    name: '',
    gender: '',
    helpBlock: '',
    nameValidationState: '',
    genderValidationState: ''
  },

  bindListeners: {
    onAddCharacterSuccess: AddCharacterActions.addCharacterSuccess,
    onAddCharacterFail: AddCharacterActions.addCharacterFail,
    onUpdateCharacterName: AddCharacterActions.updateCharacterName,
    onUpdateGender: AddCharacterActions.updateGender,
    onInvalidName: AddCharacterActions.invalidName,
    onInvalidGender: AddCharacterActions.invalidGender
  },

  onAddCharacterSuccess: function(successMessage) {
    this.state.nameValidationState = 'has-success';
    this.state.helpBlock = successMessage;
  },

  onAddCharacterFail: function(errorMessage) {
    this.state.nameValidationState = 'has-error';
    this.state.helpBlock = errorMessage;
  },

  onUpdateCharacterName: function(name) {
    this.setState({
      name: name,
      nameValidationState: '',
      helpBlock: ''
    });
  },

  onUpdateGender: function(gender) {
    this.setState({
      gender: gender,
      genderValidationState: ''
    });
  },

  onInvalidName: function() {
    this.setState({
      nameValidationState: 'has-error',
      helpBlock: 'Please enter a character name.'
    })
  },

  onInvalidGender: function() {
    this.setState({
      genderValidationState: 'has-error'
    });
  }

};

module.exports = alt.createStore(AddCharacterStore);