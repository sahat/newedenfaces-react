import alt from '../alt';

class CharacterListActions {
  constructor() {
    this.generateActions(
      'getCharactersSuccess',
      'getCharactersFail'
    );
  }

  getCharacters(payload) {
    let params = payload.router.getCurrentParams();
    let path = payload.router.getCurrentPath();

    var options = {
      race: params.race,
      bloodline: params.bloodline
    };

    if (path.includes('female')) {
      options.gender = 'female';
    }

    if (path.includes('male')) {
      options.gender = 'male';
    }

    let ajaxOptions = path.includes('shame') ? { url: '/api/characters/shame' } :
    { url: '/api/characters/top', data: options };

    $.ajax(ajaxOptions)
      .done(data => {
        this.actions.getCharactersSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getCharactersFail(jqXhr);
      });
  }
}

export default alt.createActions(CharacterListActions);