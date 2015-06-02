var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AddCharacterActions = alt.createActions({
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
  },

  updateCharacterName: function(event) {
    this.dispatch(event.target.value);
  }
});

module.exports = AddCharacterActions;