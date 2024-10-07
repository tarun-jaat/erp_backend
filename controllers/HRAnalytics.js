const HRAnalytics = require("../model/HRAnalytics");

// Create or Update HR Analytics Data
exports.createOrUpdateHRAnalytics = async (req, res) => {
  const { employeeId, workforceTrends, dashboardWidgets } = req.body;

  try {
    let hrAnalytics = await HRAnalytics.findOne({ employeeId });

    if (hrAnalytics) {
      // Update existing record
      hrAnalytics.workforceTrends =
        workforceTrends || hrAnalytics.workforceTrends;
      hrAnalytics.dashboardWidgets =
        dashboardWidgets || hrAnalytics.dashboardWidgets;

      await hrAnalytics.save();
    } else {
      // Create new record
      hrAnalytics = new HRAnalytics({
        employeeId,
        workforceTrends,
        dashboardWidgets,
      });

      await hrAnalytics.save();
    }

    res.status(200).json(hrAnalytics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get HR Analytics Data for an Employee
exports.getHRAnalytics = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const hrAnalytics = await HRAnalytics.findOne({ employeeId })
      .populate("employeeId", "firstName lastName")
      .exec();

    if (!hrAnalytics) {
      return res.status(404).json({ message: "HR analytics record not found" });
    }

    res.json(hrAnalytics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Dashboard Widgets
exports.getDashboardWidgets = async (req, res) => {
  try {
    const dashboardData = await HRAnalytics.find().exec();
    res.json(dashboardData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};