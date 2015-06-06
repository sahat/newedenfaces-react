import {assign} from 'underscore';
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.characters = [];
  }

  onGetTwoCharactersSuccess(data) {
    this.characters = data;
  }

  onGetTwoCharactersFail(jqXhr) {
    toastr.error(jqXhr.responseText || jqXhr.statusText);
  }

  onVoteFail(jqXhr) {
    toastr.error(jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(HomeStore);