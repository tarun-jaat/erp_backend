const mongoose = require("mongoose");

const CompensationBenefitsSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  payroll: {
    salary: {
      type: Number,
      required: true,
    },
    disbursementDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  benefits: {
    healthInsurance: {
      provider: String,
      policyNumber: String,
      coverage: String,
      startDate: Date,
      endDate: Date,
    },
    retirementPlan: {
      provider: String,
      planDetails: String,
      startDate: Date,
    },
    additionalBenefits: [String],
  },
  compensationAnalysis: {
    marketSalaryRange: {
      min: Number,
      max: Number,
    },
    companySalary: {
      type: Number,
      required: true,
    },
    isCompetitive: {
      type: Boolean,
      default: function () {
        if (
          this.compensationAnalysis &&
          this.compensationAnalysis.marketSalaryRange
        ) {
          const { min, max } = this.compensationAnalysis.marketSalaryRange;
          return this.companySalary >= min && this.companySalary <= max;
        }
        return false; // Default to false if marketSalaryRange is not provided
      },
    },
    notes: String,
  },
});

module.exports = mongoose.model(
  "CompensationBenefits",
  CompensationBenefitsSchema
);
