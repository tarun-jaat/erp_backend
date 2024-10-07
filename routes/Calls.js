// routes/callRoutes.js
const express = require('express');
const Call = require('../model/Calls');

const router = express.Router();

// Create a new call entry
router.post('/schedule', async (req, res) => {
  const { callTo, relatedTo, callType, callStatus, startTime, callOwner, subject } = req.body;

  try {
    const newCall = new Call({
      callTo,
      relatedTo,
      callType,
      callStatus,
      startTime,
      callOwner,
      subject,
    });

    await newCall.save();
    res.status(201).json({ message: 'Call scheduled successfully', call: newCall });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling call', error });
  }
});

// Get all calls
router.get('/', async (req, res) => {
  try {
    const calls = await Call.find();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching calls', error });
  }
});

module.exports = router;
