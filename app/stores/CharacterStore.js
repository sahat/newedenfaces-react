import {assign, contains} from 'underscore';
import alt from '../alt';
import CharacterActions from '../actions/CharacterActions';

class CharacterStore {
  constructor() {
    this.bindActions(CharacterActions);
    this.characterId = 0;
    this.name = 'TBD';
    this.race = 'TBD';
    this.bloodline = 'TBD';
    this.gender = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.winLossRatio = 0;
    this.email = '';
    this.isReported = false;
    this.isSubscribed = false;
    this.prevPath = null;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onGetCharacterSuccess(payload) {
    $(document.body).attr('class', 'profile ' + payload.data.race.toLowerCase());

    assign(this, payload.data);
    this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1); // NaN or 0
    this.prevPath = payload.path;

    let appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    this.isReported = contains(appData.reports, payload.data.characterId);
    this.isSubscribed = contains(appData.subscriptions, payload.data.characterId);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  onGetCharacterFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onReportSuccess() {
    this.isReported = true;

    let appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    appData.reports = appData.reports || [];
    appData.reports.push(this.characterId);
    localStorage.setItem('NEF', JSON.stringify(appData));

    toastr.warning('Character has been reported.');
  }

  onReportFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onSubscribeSuccess() {
    this.isSubscribed = true;

    let appData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    appData.subscriptions = appData.subscriptions || [];
    appData.subscriptions.push(this.characterId);
    localStorage.setItem('NEF', JSON.stringify(appData));
  }

  onSubscribeFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(CharacterStore);