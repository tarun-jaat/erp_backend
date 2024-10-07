const mongoose = require("mongoose");

const ExitManagementSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    exitDate: {
      type: Date,
      required: true,
    },
    feedback: {
      type: String,
    },
    documents: {
      relievingLetter: {
        type: String,
        default: null, // URL or file path of the generated relieving letter
      },
      experienceLetter: {
        type: String,
        default: null, // URL or file path of the generated experience letter
      },
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExitManagement", ExitManagementSchema);
