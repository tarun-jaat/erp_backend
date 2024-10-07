const mongoose = require("mongoose");

const emailCampaignSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Draft", "Sent", "Failed"],
    default: "Draft",
  },
  sentAt:{
    type: Date,
  },
  sentTo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  segmentationId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Segmentation",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmailCampaign", emailCampaignSchema);
