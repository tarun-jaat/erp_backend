const express = require("express");
const router = express.Router();

const emailCampaignController = require("../controllers/EmailManagementController");

router.post("/campaigns", emailCampaignController.createCampaign); 
// router.get("/campaigns/:id", emailCampaignController.getCampaignById); 

router.get("/campaigns", emailCampaignController.getCampaigns);

router.put("/campaigns/:id", emailCampaignController.updateCampaign);

router.post('/createSegmentation',emailCampaignController.createSegment);

router.post('/sendMails',emailCampaignController.sendCampaign)

module.exports = router;
