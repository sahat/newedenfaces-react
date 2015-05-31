var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AddCharacterActions = {
  addCharacter: function(name, gender) {
    WebAPIUtils.addCharacter(name, gender)
      .done(function(data) {
        this.actions.addCharacterSucceeded(data.message);
      }.bind(this))
      .fail(function(jqXHR) {
        this.actions.addCharacterFailed(jqXHR.responseJSON.message);
      }.bind(this));
  },

  addCharacterSuccess: function(message) {
    this.dispatch(message);
  },

  addCharacterFail: function(message) {
    this.dispatch(message);
  }

  updateCharacterName: function(name) {
    this.dispatch(name);
  }
};

module.exports = alt.createActions(AddCharacterActions);