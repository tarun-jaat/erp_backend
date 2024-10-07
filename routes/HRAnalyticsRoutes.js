const express = require("express");
const router = express.Router();
const {
  createOrUpdateHRAnalytics,
  getHRAnalytics,
  getDashboardWidgets,
} = require("../controllers/HRAnalytics");

// Route to create or update HR analytics data
router.post("/create-analytics", createOrUpdateHRAnalytics);

// Route to get HR analytics data for an employee
router.get("/analytics/:employeeId", getHRAnalytics);

// Route to get all dashboard widgets data
router.get("/dashboard", getDashboardWidgets);

module.exports = router;
