const express = require("express");
const router = express.Router();
const {
  createOrUpdateLearningAndDevelopment,
  getLearningAndDevelopmentByEmployee
} = require("../controllers/LearnDevelopController");

// Create or Update Learning and Development data
router.post("/create-learn-development", createOrUpdateLearningAndDevelopment);

// Get Learning and Development data for a specific employee
router.get("/get-learning/:employeeId", getLearningAndDevelopmentByEmployee);

module.exports = router;
