// models/Deal.js
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    taskOwner: { type: String, required: true },
    dealName: { type: String, required: true },
    accountName: { type: String, required: true },
    leadSource: { type: String, required: true },
    contactName: { type: String, required: true },
    account: { type: String, required: true },
    closingDate: { type: Date, required: true },
    currentStage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
