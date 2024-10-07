const mongoose = require("mongoose");

// Line Item Schema
const lineItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// Sales Schema
const salesSchema = new mongoose.Schema({
  user: {
    type: String,
    // ref: "User",
    // required: true,
  },
  type: {
    type: String,
    enum: [
      "quote",
      "retainer_invoice",
      "sales_order",
      "invoice",
      "credit_note",
      "payment",
    ],
    required: true,
  },
  lineItems: [lineItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled", "completed", "partially billed", "open", "closed"],
    default: "open",
  },
  isRecurring: { type: Boolean, default: false },
  recurrenceFrequency: {
    type: String,
    enum: ["monthly", "quarterly", "annually"],
    default: null,
  },
  nextInvoiceDate: { type: Date, default: null },
  paymentsReceived: { type: Number, default: 0 },
  dueDate: { type: Date, default: null },
  creditAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },

  // New fields
  purchaseOrderNumber: {
    type: String,
    required: true,
  },
  referenceNumber: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Exporting the model
module.exports = mongoose.model("Sales", salesSchema);
