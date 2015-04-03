var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

module.exports = mongoose.model('Subscriber', subscriberSchema);