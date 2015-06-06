var alt = require('../alt');
var WebAPIUtils = require('../utils/WebAPIUtils');

var AddCharacterActions = alt.createActions({

  addCharacter: function(name, gender) {
    WebAPIUtils.addCharacter(name, gender)
      .done(function(data) {
        this.actions.addCharacterSuccess(data.message);
      }.bind(this))
      .fail(function(jqXHR) {
        this.actions.addCharacterFail(jqXHR.responseJSON.message);
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
  },

  updateGender: function(event) {
    this.dispatch(event.target.value);
  },

  invalidName: function() {
    this.dispatch();
  },

  invalidGender: function() {
    this.dispatch();
  }

});

module.exports = AddCharacterActions;