const mongoose = require("mongoose");

const PerformanceManagementSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  goals: [
    {
      title: {
        type: String,
        required: true
      },
      description: String,
      startDate: Date,
      dueDate: Date,
      progress: {
        type: Number,
        default: 0
      }
    }
  ],
  performanceReviews: [
    {
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
      },
      review: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  feedback: [
    {
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
      },
      feedback: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("PerformanceManagement", PerformanceManagementSchema);
