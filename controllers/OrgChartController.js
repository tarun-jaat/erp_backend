const OrgChart = require("../model/OrgChart");

exports.createOrUpdateOrgChart = async (req, res) => {
  const { employee, manager, department, position } = req.body;

  try {
    // Find if the org chart for the employee exists
    let orgChart = await OrgChart.findOne({ employee });

    if (orgChart) {
      // Update the existing org chart
      orgChart = await OrgChart.findOneAndUpdate(
        { employee }, // Find by employee
        {
          manager,
          department,
          position,
        },
        {
          new: true,
        }
      );
    } else {
      // Create a new org chart if it doesn't exist
      orgChart = new OrgChart({ employee, manager, department, position });
      // Save the newly created org chart to the database
      await orgChart.save();
    }

    // Return the org chart
    res.json(orgChart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get OrgChart with populated fields
exports.getOrgChart = async (req, res) => {
  try {
    // Find and populate employee and manager fields
    const orgChart = await OrgChart.find().populate(
      "employee manager",
      "firstName lastName position"
    );
    // Return the org chart data
    res.json(orgChart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
