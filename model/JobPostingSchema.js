const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    skillsRequired: [
      String
    ],
    status: { 
      type: String, 
      enum: ["open", "closed"], 
      default: "open" 
    },
    applicants: [
      {
        name: String,
        email: String,
        resume: String,
        status: {
          type: String,
          enum: ["applied", "shortlisted", "interviewed", "hired", "rejected"],
          default: "applied",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPosting", jobPostingSchema);
