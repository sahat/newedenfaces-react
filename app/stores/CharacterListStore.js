import {assign} from 'underscore';
import alt from '../alt';
import CharacterListActions from '../actions/CharacterListActions';

class CharacterListStore {
  constructor() {
    this.bindActions(CharacterListActions);
    this.characters = [];
    this.prevPath = null;
  }

  onGetCharactersSuccess(payload) {
    this.characters = payload.data;
    this.prevPath = payload.path;
  }

  onGetCharactersFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(CharacterListStore);