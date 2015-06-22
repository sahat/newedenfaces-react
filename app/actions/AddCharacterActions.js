import alt from '../alt';

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
    $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    })
      .done(() => {
        this.actions.addCharacterSuccess();
      })
      .fail((jqXhr) => {
        this.actions.addCharacterFail(jqXhr);
      });
  }
}

export default alt.createActions(AddCharacterActions);