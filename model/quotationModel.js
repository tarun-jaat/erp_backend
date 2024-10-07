const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    quoteNumber: { type: String, required: true },
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalValue: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Accepted", "Declined"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
