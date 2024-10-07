const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
    },
    date: {
      type: Date,
      required: true,
    },
    interviewer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
