import alt from '../alt';
import WebAPAddCharacterActionsIUtils from '../actions/AddCharacterActions';

class AddCharacterStore {
  constructor() {
    this.bindActions(AddCharacterActions);
    this.name = '';
    this.gender = '';
    this.helpBlock = '';
    this.nameValidationState = '';
    this.genderValidationState = '';
  }

  onAddCharacterSuccess(successMessage) {
    this.state.nameValidationState = 'has-success';
    this.state.helpBlock = successMessage;
  }

  onAddCharacterFail(errorMessage) {
    this.state.nameValidationState = 'has-error';
    this.state.helpBlock = errorMessage;
  }

  onUpdateName(name) {
    this.setState({
      name: name,
      nameValidationState: '',
      helpBlock: ''
    });
  }

  onUpdateGender(gender) {
    this.setState({
      gender: gender,
      genderValidationState: ''
    });
  }

  onInvalidName() {
    this.setState({
      nameValidationState: 'has-error',
      helpBlock: 'Please enter a character name.'
    })
  }

  onInvalidGender() {
    this.setState({
      genderValidationState: 'has-error'
    });
  }
}

export default alt.createStore(AddCharacterStore);