const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    sku: { type: String, required: true },
    image: { type: String }, 
    stock:{
      type: Number,
      default: 0
    },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
