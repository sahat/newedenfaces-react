var alt = require('../alt');
var AddCharacterActions = require('../actions/AddCharacterActions');

var AddCharacterStore = {
  displayName: 'AppStore',

  state: {
    helpBlock: '',
    nameValidationState: '',
    genderValidationState: ''
  },

  bindListeners: {
    onAddCharacterSucceeded: AddCharacterActions.ADD_CHARACTER_SUCCEEDED,
    onAddCharacterFailed: AddCharacterActions.ADD_CHARACTER_FAILED
  },

  onAddCharacterSucceeded: function(successMessage) {
    this.state.nameValidationState = 'has-success';
    this.state.helpBlock = successMessage;
  },

  onAddCharacterFailed: function(errorMessage) {
    this.state.nameValidationState = 'has-error';
    this.state.helpBlock = errorMessage;
  }
};

module.exports = alt.createStore(AddCharacterStore);