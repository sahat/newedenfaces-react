import alt from '../alt';
import WebAPIUtils from '../utils/WebAPIUtils';

class AddCharacterActions {
  constructor() {
    this.generateActions(
      'addCharacterSuccess',
      'addCharacterFail',
      'updateName',
      'updateGender',
      'invalidName',
      'invalidGender'
    );
  }

  addCharacter(name, gender) {
    WebAPIUtils.addCharacter(name, gender)
      .done(function(data) {
        this.actions.addCharacterSuccess(data.message);
      }.bind(this))
      .fail(function(jqXHR) {
        this.actions.addCharacterFail(jqXHR.responseJSON.message);
      }.bind(this));
  }
}

export default alt.createActions(AddCharacterActions);