import alt from '../alt';

class CharacterListActions {
  constructor() {
    this.generateActions(
      'getCharactersSuccess',
      'getCharactersFail'
    );
  }

  getCharacters(payload) {
    var options = {
      race: payload.params.race,
      bloodline: payload.params.bloodline
    };

    if (payload.path.includes('female')) {
      options.gender = 'female';
    }

    if (payload.path.includes('male')) {
      options.gender = 'male';
    }

    let ajaxOptions = payload.path.includes('shame') ? { url: '/api/characters/shame' } :
    { url: '/api/characters/top', data: options };

    $.ajax(ajaxOptions)
      .done(data => {
        this.actions.getCharactersSuccess({ data: data, path: payload.path });
      })
      .fail(jqXhr => {
        this.actions.getCharactersFail(jqXhr);
      });
  }
}

export default alt.createActions(CharacterListActions);