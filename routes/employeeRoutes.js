const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../controllers/authMidleware");
// Route to create an Employee
router.post("/register", createEmployee);

// Route to get all Employees
router.get("/getEmployee", getEmployees);

// Route to update an Employee
router.put("/updateEmployee", updateEmployee);

// Route to delete an Employee
router.delete("/deleteEmployee", deleteEmployee);

module.exports = router;