const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "TransGender", "Other"],
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee", "HR"],
    default: "Employee",
    required: true,
  },
  profilePicture: {
    type: String,
  },
  permission: {
    type: Array,
    default: [],
  },
  address: {
    street: {
      type: String,
      trime: true,
    },
    pinCode: {
      type: Number,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
  },
  twoFASecret: { type: String, default: null },
  twoFAEnabled: { type: Boolean, default: false },
  otpRequired: { type: Boolean, default: false },
  lastLogin: { type: Date, default: null }, 
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
