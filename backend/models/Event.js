const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  reminder: { type: Date, required: false },
});

module.exports = mongoose.model('Event', eventSchema);
