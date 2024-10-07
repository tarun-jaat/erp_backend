const mongoose = require("mongoose");

const onboardingTaskSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    taskName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OnboardingTask", onboardingTaskSchema);
