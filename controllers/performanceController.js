const PerformanceManagement = require("../model/PerformanceSchema");
const Employee = require("../model/Employee");
exports.createOrUpdatePerformance = async (req, res) => {
  const { employee, goals, performanceReviews, feedback } = req.body;
  try {
    let performance = await PerformanceManagement.findOne({ employee });

    if (performance) {
      // Update existing performance management entry
      performance.goals = goals || performance.goals;
      performance.performanceReviews =
        performanceReviews || performance.performanceReviews;
      performance.feedback = feedback || performance.feedback;
      await performance.save();
      res.json(performance);
    } else {
      // Create a new performance management entry
      performance = new PerformanceManagement({
        employee,
        goals,
        performanceReviews,
        feedback,
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
    const performance = await PerformanceManagement.find()
      .populate("employee", "firstName lastName")
      .populate("performanceReviews.reviewer", "firstName lastName position")
      .populate("feedback.provider", "firstName lastName position");

    if (!performance) {
      return res
        .status(404)
        .json({ msg: "No performance data found for this employee" });
    }

    res.json(performance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllPerformance = async (req, res) => {
  try {
    // Fetch all performance entries and populate employee details
    const performances = await PerformanceManagement.find()
      .populate("employeeId", "firstName lastName") // Populate employeeId with firstName and lastName
      .exec();

    // Check if there are no entries
    if (performances.length === 0) {
      return res.status(404).json({ msg: "No performance records found." });
    }

    // Map performances to include employee names and other details
    const performanceData = performances.map((performance) => ({
      employeeId: performance.employeeId ? performance.employeeId._id : null,
      employeeName: performance.employeeId
        ? `${performance.employeeId.firstName} ${performance.employeeId.lastName}`
        : "Unknown", // Handle case where employeeId might not be found
      goals: performance.goals,
      performanceReviews: performance.performanceReviews,
      feedback: performance.feedback,
    }));

    // Return the list of performances with employee names
    res.json(performanceData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
