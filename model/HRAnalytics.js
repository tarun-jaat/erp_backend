const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const DashboardWidgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  metrics: [MetricSchema],
});

const HRAnalyticsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    workforceTrends: [MetricSchema],
    dashboardWidgets: [DashboardWidgetSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HRAnalytics", HRAnalyticsSchema);
