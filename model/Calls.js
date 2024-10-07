// models/Call.js
const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  callTo: { type: String, required: true },
  relatedTo: { type: String, required: true },
  callType: { type: String, required: true },
  callStatus: { type: String, required: true },
  startTime: { type: Date, required: true },
  callOwner: { type: String, required: true },
  subject: { type: String, required: true },
}, { timestamps: true });

const Call = mongoose.model('Call', callSchema);

module.exports = Call;
