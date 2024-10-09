const express = require("express");
const router = express.Router();
const {
  createOrUpdatePerformance,
  getPerformanceByEmployee,
  getAllPerformance
} = require("../controllers/performanceController");

// Create or Update Performance Management data
router.post("/create-update-performance", createOrUpdatePerformance);

// Get Performance Management data for a specific employee
router.get("/get-performance/:employeeId", getPerformanceByEmployee);

router.get("/get-performance", getAllPerformance);
module.exports = router;