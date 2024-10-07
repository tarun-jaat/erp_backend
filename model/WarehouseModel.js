const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    bins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bin" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
