const express = require("express");
const router = express.Router();
const {
  createOrUpdatePerformance,
  getPerformanceByEmployee
} = require("../controllers/performanceController");

// Create or Update Performance Management data
router.post("/create-update-performance", createOrUpdatePerformance);

// Get Performance Management data for a specific employee
router.get("/get-performance/:employeeId", getPerformanceByEmployee);

module.exports = router;