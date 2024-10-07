const express = require('express');
const { createMeeting, getMeetings } = require('../controllers/Meetings');

const router = express.Router();

// Route for creating a new meeting
router.post('/create', createMeeting);

// Route for fetching all meetings
router.get('/', getMeetings);

module.exports = router;
