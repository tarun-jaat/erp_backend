const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  name: { type: String, required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Bin', binSchema);
