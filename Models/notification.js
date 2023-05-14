const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  plant: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
