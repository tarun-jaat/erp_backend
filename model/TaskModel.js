const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskOwner: { type: String, required: true },
  subject: { type: String, required: true },
  dueDate: { type: Date, required: true },
  contact: { type: String, required: true },
  account: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed', 'In Progress'], required: true },
  priority: { type: String, enum: ['Highest', 'High', 'Normal', 'Low', 'Lowest'], required: true },
});

module.exports = mongoose.model('Task', taskSchema);
