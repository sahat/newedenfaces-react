var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  characters: [{ type: String, ref: 'Character' }]
});

module.exports = mongoose.model('Subscriber', subscriberSchema);