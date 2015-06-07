import alt from '../alt';

class CharacterActions {
  constructor() {
    this.generateActions(
      'updateEmail',
      'reportSuccess',
      'reportFail',
      'subscribeSuccess',
      'subscribeFail',
      'getCharacterSuccess',
      'getCharacterFail'
    );
  }

  getCharacter(payload) {
    let characterId = payload.router.getCurrentParams().id;
    let path = payload.router.getCurrentPath();

    $.ajax({ url: '/api/characters/' + characterId })
      .done(data => {
        this.actions.getCharacterSuccess({ data: data, path: path });
      })
      .fail(jqXhr => {
        this.actions.getCharacterFail(jqXhr);
      });
  }

  report(characterId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { characterId: characterId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }

  subscribe(payload) {
    $.ajax({
      type: 'POST',
      url: '/api/subscribe',
      data: { email: payload.email, characterId: payload.characterId }
    })
      .done(() => {
        this.actions.subscribeSuccess();
      })
      .fail((jqXhr) => {
        this.actions.subscribeFail(jqXhr);
      })
  }
}

export default alt.createActions(CharacterActions);