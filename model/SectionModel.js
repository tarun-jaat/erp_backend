const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bin: { type: mongoose.Schema.Types.ObjectId, ref: 'Bin' },
  capacity: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  filled: { type: Boolean, default: false }
}, { timestamps: true });

// Pre-save middleware to set "filled" status
sectionSchema.pre('save', function(next) {
  if (this.items.length >= this.capacity) {
    this.filled = true;
  } else {
    this.filled = false;
  }
  next();
});

module.exports = mongoose.model('Section', sectionSchema);
