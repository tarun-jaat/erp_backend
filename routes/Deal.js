// routes/deals.js
const express = require("express");
const router = express.Router();
const Deal = require("../model/Deal");

// Create a new deal
router.post("/createDeal", async (req, res) => {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.status(200).json({ message: "Deal created successfully", deal: newDeal });
  } catch (error) {
    res.status(400).json({ message: "Error creating deal", error });
  }
});

// Get all deals
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deals", error });
  }
});

module.exports = router;
