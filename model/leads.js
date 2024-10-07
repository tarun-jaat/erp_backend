// models/lead.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
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
    description:{
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
        assignedTo: {
      type: String,
      // ref: "User",
    },
    
    // assignedTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // contactId:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Contact",
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
    value:{
      type: Number,
      default: 0,
    },
    quotations:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
    },
    notes: [
      {
        note: String,
        date: { type: Date, default: Date.now },
      },
    ],
    address: {
      type: {
        name: String,
        street: String,
        landmark: String,
        pincode: String,
        country: String,
        state: String
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
