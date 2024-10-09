const CompensationBenefits = require("../model/CompensatonBenefits");

exports.createOrUpdateCompensationBenefits = async (req, res) => {
  const { employee, payroll, benefits, compensationAnalysis } = req.body;
  try {
    let compensationBenefits = await CompensationBenefits.findOne({ employee });

    if (compensationBenefits) {
      // Update existing record
      compensationBenefits.payroll = payroll || compensationBenefits.payroll;
      compensationBenefits.benefits = benefits || compensationBenefits.benefits;
      compensationBenefits.compensationAnalysis =
        compensationAnalysis || compensationBenefits.compensationAnalysis;
      await compensationBenefits.save();
      res.json(compensationBenefits);
    } else {
      // Create a new record
      compensationBenefits = new CompensationBenefits({
        employee,
        payroll,
        benefits,
        compensationAnalysis,
      });
      await compensationBenefits.save();
      res.json(compensationBenefits);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllCompensation = async (req, res) => {
  try {
    const compensationBenefits = await CompensationBenefits.find().populate(
      "employee",
      "firstName lastName position"
    );
    res.json(compensationBenefits);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
exports.getCompensationBenefitsByEmployee = async (req, res) => {
  try {
    const compensationBenefits = await CompensationBenefits.findOne({
      employee: req.params.employeeId,
    }).populate("employee", "firstName lastName position");

    if (!compensationBenefits) {
      return res.status(404).json({
        msg: "No compensation and benefits data found for this employee",
      });
    }

    res.json(compensationBenefits);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
