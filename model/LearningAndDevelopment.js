const mongoose = require("mongoose");

const LearningAndDevelopmentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  trainingSessions: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      scheduledDate: Date,
      status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled",
      },
    },
  ],
  skillGapAnalysis: [
    {
      skill: {
        type: String,
        required: true,
      },
      currentLevel: {
        type: Number,
        min: 1,
        max: 5,
      },
      requiredLevel: {
        type: Number,
        min: 1,
        max: 5,
      },
      gap: {
        type: Number,
        default: function () {
          return this.requiredLevel - this.currentLevel;
        },
      },
      actionPlan: String,
    },
  ],
  careerDevelopment: {
    mentorship: {
      mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      startDate: Date,
      goals: String,
    },
    developmentPlan: [
      {
        goal: {
          type: String,
          required: true,
        },
        steps: String,
        targetDate: Date,
        completionStatus: {
          type: String,
          enum: ["In Progress", "Completed"],
          default: "In Progress",
        },
      },
    ],
  },
});

module.exports = mongoose.model(
  "LearningAndDevelopment",
  LearningAndDevelopmentSchema
);
