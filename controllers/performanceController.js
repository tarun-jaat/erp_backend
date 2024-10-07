const PerformanceManagement = require("../model/PerformanceSchema");

exports.createOrUpdatePerformance = async (req, res) => {
  const { employee, goals, performanceReviews, feedback } = req.body;
  try {
    let performance = await PerformanceManagement.findOne({ employee });
    
    if (performance) {
      // Update existing performance management entry
      performance.goals = goals || performance.goals;
      performance.performanceReviews = performanceReviews || performance.performanceReviews;
      performance.feedback = feedback || performance.feedback;
      await performance.save();
      res.json(performance);
    } else {
      // Create a new performance management entry
      performance = new PerformanceManagement({
        employee,
        goals,
        performanceReviews,
        feedback
      });
      await performance.save();
      res.json(performance);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getPerformanceByEmployee = async (req, res) => {
  try {
    const performance = await PerformanceManagement.findOne({ employee: req.params.employeeId })
      .populate("employee", "firstName lastName")
      .populate("performanceReviews.reviewer", "firstName lastName position")
      .populate("feedback.provider", "firstName lastName position");
      
    if (!performance) {
      return res.status(404).json({ msg: "No performance data found for this employee" });
    }

    res.json(performance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
