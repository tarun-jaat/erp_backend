const LearningAndDevelopment = require("../model/LearningAndDevelopment");

exports.createOrUpdateLearningAndDevelopment = async (req, res) => {
  const { employee, trainingSessions, skillGapAnalysis, careerDevelopment } = req.body;
  try {
    let learningAndDevelopment = await LearningAndDevelopment.findOne({ employee });
    
    if (learningAndDevelopment) {
      // Update existing entry
      learningAndDevelopment.trainingSessions = trainingSessions || learningAndDevelopment.trainingSessions;
      learningAndDevelopment.skillGapAnalysis = skillGapAnalysis || learningAndDevelopment.skillGapAnalysis;
      learningAndDevelopment.careerDevelopment = careerDevelopment || learningAndDevelopment.careerDevelopment;
      await learningAndDevelopment.save();
      res.json(learningAndDevelopment);
    } else {
      // Create a new entry
      learningAndDevelopment = new LearningAndDevelopment({
        employee,
        trainingSessions,
        skillGapAnalysis,
        careerDevelopment
      });
      await learningAndDevelopment.save();
      res.json(learningAndDevelopment);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getLearningAndDevelopmentByEmployee = async (req, res) => {
  try {
    const learningAndDevelopment = await LearningAndDevelopment.findOne({ employee: req.params.employeeId })
      .populate("employee", "firstName lastName")
      .populate("careerDevelopment.mentorship.mentor", "firstName lastName position");
    
    if (!learningAndDevelopment) {
      return res.status(404).json({ msg: "No learning and development data found for this employee" });
    }

    res.json(learningAndDevelopment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};