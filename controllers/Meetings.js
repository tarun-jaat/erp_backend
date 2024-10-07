const Meeting = require('../model/Meeting');

// Create a new meeting
exports.createMeeting = async (req, res) => {
  const {
    title, location, allDay, fromDate, fromTime, toDate, toTime, host, participants, relatedTo
  } = req.body;

  try {
    const newMeeting = new Meeting({
      title,
      location,
      allDay,
      fromDate,
      fromTime,
      toDate,
      toTime,
      host,
      participants,
      relatedTo,
    });

    await newMeeting.save();
    res.status(201).json({ message: 'Meeting created successfully', meeting: newMeeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Server error. Could not create meeting.' });
  }
};

// Fetch all meetings
exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ message: 'Server error. Could not fetch meetings.' });
  }
};
