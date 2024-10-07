// models/contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message:{
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
  company: String,
  communicationHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      communicationType: {
        type: String,
        enum: ["email", "phone", "meeting"],
        required: true,
      },
      details: {
        type: String,
      },
    },
  ],
  preferences: {
    contactMethod: {
      type: String,
      enum: ["email", "phone", "meeting"],
      default: "email",
    },
    preferredContactTime: {
      type: String,
      default: "Anytime",
    },
  },
  ticketNo:{
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
