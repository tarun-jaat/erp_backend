const mongoose = require("mongoose");

const segmentationSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  criteria: {
    criteria: { 
        type: String,
        required: true
     }, // e.g., {"age": {"$gt": 25}}, you could use JSON or another format for defining criteria
  },
  contacts: [
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubscribeContacts" 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Segmentation", segmentationSchmea);
