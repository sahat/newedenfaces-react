var WebAPIUtils = {
  addCharacter: function(name, gender) {
    return $.ajax({
      type: 'POST',
      url: '/api/characters',
      data: { name: name, gender: gender }
    });
  }
};

module.exports = WebAPIUtils;