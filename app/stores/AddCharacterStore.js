var alt = require('../alt');
var AppActions = require('../actions/AddCharacterActions');

var AppStore = {
  displayName: 'AppStore',

  state: {
    helpBlock: '',
    nameValidationState: '',
    genderValidationState: ''
  },

  bindListeners: {
    onAddCharacterSucceeded: AppActions.ADD_CHARACTER_SUCCEEDED,
    onAddCharacterFailed: AppActions.ADD_CHARACTER_FAILED
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

module.exports = alt.createStore(AppStore);