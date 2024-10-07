// models/ticketCounter.js
const mongoose = require("mongoose");

const ticketCounterSchema = new mongoose.Schema({
  ticketNo: {
    type: Number,
    default: 0,
  },
//   contact:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Contact"
//   }
});

module.exports = mongoose.model("TicketCounter", ticketCounterSchema);