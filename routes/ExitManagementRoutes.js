const express = require("express");
const router = express.Router();
const {
  createExitRecord,
  getExitRecord,
  completeExitProcess,
} = require("../controllers/ExitManagementController");

// Route to create exit record and generate letters
router.post("/exit", createExitRecord);

// Route to get an employee's exit record
router.get("/exit/:employeeId", getExitRecord);

// Route to complete the exit process
router.put("/exit/:employeeId/complete", completeExitProcess);

module.exports = router;