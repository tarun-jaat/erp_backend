const Interview = require("../model/InterviewSchema");

exports.scheduleInterview = async (req, res) => {
  const { applicantId, date, interviewer } = req.body;

  try {
    const interview = new Interview({
      applicantId,
      date,
      interviewer,
    });
    
    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
