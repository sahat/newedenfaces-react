var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AppActions = function() {

};

AppActions.prototype.addCharacter = function(name, gender) {
  console.log('before dispatch');
  this.dispatch(name, gender);
  console.log('add character ctions;');

  WebAPIUtils.addCharacter(name, gender)
    .done(function(data) {
      this.actions.addCharacterSucceeded(data.message);
    }.bind(this))
    .fail(function(jqXHR) {
      this.actions.addCharacterFailed(jqXHR.responseJSON.message);
    }.bind(this));
};

AppActions.prototype.addCharacterSucceeded = function(successMessage) {
  this.dispatch(successMessage);
};

AppActions.prototype.addCharacterFailed = function(errorMessage) {
  this.dispatch(errorMessage);
};

module.exports = alt.createActions(AppActions);