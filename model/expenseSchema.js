const mongoose = require("mongoose");

// Expense Schema
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  toWhom: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  recurrenceFrequency: {
    type: String,
    enum: ["monthly", "quarterly", "annually"],
    default: null,
  },
  paidBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
