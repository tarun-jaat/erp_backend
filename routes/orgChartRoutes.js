const express = require("express")

const router = express.Router();

const {
    createOrUpdateOrgChart,
    getOrgChart
} = require("../controllers/OrgChartController")

// Route to create OrgChart
router.post("/createOrUpdateOrgChart", createOrUpdateOrgChart)

// Route to get OrgChart
router.get("/getOrgChart", getOrgChart)

module.exports = router;