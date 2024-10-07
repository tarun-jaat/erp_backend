const mongoose = require("mongoose");

// Financial Report Schema
const financialReportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income_statement", "balance_sheet", "cash_flow_statement"],
    required: true,
  },
  periodStart: {
    type: Date,
    required: true,
  },
  periodEnd: {
    type: Date,
    required: true,
  },
  reportData: {
    type: Map,
    of: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FinancialReport", financialReportSchema);