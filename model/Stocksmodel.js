const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin', required: true },
  section: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Stock', stockSchema);
