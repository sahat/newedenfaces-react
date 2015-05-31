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
    onUpdateCharacterName: AddCharacterActions.updateCharacterName
  },

  onAddCharacterSuccess: function(successMessage) {
    this.state.nameValidationState = 'has-success';
    this.state.helpBlock = successMessage;
  },

  onAddCharacterFail: function(errorMessage) {
    this.state.nameValidationState = 'has-error';
    this.state.helpBlock = errorMessage;
  }

  onUpdateCharacterName: function(name) {
    this.setState({
      name: name,
      nameValidationState: '',
      helpBlock: ''
    });
  }

};

module.exports = alt.createStore(AddCharacterStore);