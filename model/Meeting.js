const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  fromTime: {
    type: String,
  },
  toDate: {
    type: Date,
    required: true,
  },
  toTime: {
    type: String,
  },
  host: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: String,
    },
  ],
  relatedTo: {
    type: String,
    default: 'None',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Meeting', meetingSchema);
