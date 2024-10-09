const express = require("express");
const router = express.Router();
const {
  createOrUpdateCompensationBenefits,
  getCompensationBenefitsByEmployee,
  getAllCompensation
} = require("../controllers/compensationBenefits");

// Create or Update Compensation and Benefits data
router.post("/create-compensation-benefits", createOrUpdateCompensationBenefits);

// Get Compensation and Benefits data for a specific employee
router.get("/get-compensation-benefits/:employeeId", getCompensationBenefitsByEmployee);

router.get("/get-compensation-benefits", getAllCompensation);
module.exports = router;