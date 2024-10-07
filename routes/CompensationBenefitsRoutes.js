const express = require("express");
const router = express.Router();
const {
  createOrUpdateCompensationBenefits,
  getCompensationBenefitsByEmployee
} = require("../controllers/compensationBenefits");

// Create or Update Compensation and Benefits data
router.post("/create-compensation-benefits", createOrUpdateCompensationBenefits);

// Get Compensation and Benefits data for a specific employee
router.get("/get-compensation-benefits/:employeeId", getCompensationBenefitsByEmployee);

module.exports = router;