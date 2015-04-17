var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AppActions = {
  addCharacter: function(name, gender) {
    WebAPIUtils.addCharacter(name, gender)
      .done(function(data) {
        this.actions.addCharacterSucceeded(data.message);
      }.bind(this))
      .fail(function(jqXHR) {
        this.actions.addCharacterFailed(jqXHR.responseJSON.message);
      }.bind(this));
  },

  addCharacterSucceeded: function(successMessage) {
    this.dispatch(successMessage);
  },

  addCharacterFailed: function(errorMessage) {
    this.dispatch(errorMessage);
  }
};

module.exports = alt.createActions(AppActions);