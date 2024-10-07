const ComplianceRiskManagement = require("../model/CompilanceRiskManage");

// Create or Update Compliance and Risk Management Data
exports.createOrUpdateComplianceRiskManagement = async (req, res) => {
  const { employee, hrCompliance, policyManagement, auditTrails, reports } =
    req.body;

  try {
    let complianceRecord = await ComplianceRiskManagement.findOne({ employee });

    if (complianceRecord) {
      // Update existing record
      complianceRecord.hrCompliance =
        hrCompliance || complianceRecord.hrCompliance;
      complianceRecord.policyManagement =
        policyManagement || complianceRecord.policyManagement;
      complianceRecord.auditTrails =
        auditTrails || complianceRecord.auditTrails;
      complianceRecord.reports = reports || complianceRecord.reports;

      await complianceRecord.save();
    } else {
      // Create new record
      complianceRecord = new ComplianceRiskManagement({
        employee,
        hrCompliance,
        policyManagement,
        auditTrails,
        reports,
      });

      await complianceRecord.save();
    }

    res.status(200).json(complianceRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Compliance and Risk Management Data for an Employee
exports.getComplianceRiskManagement = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const complianceRecord = await ComplianceRiskManagement.findOne({
      employee: employeeId,
    })
      .populate("employee", "firstName lastName")
      .exec();

    if (!complianceRecord) {
      return res.status(404).json({ message: "Compliance record not found" });
    }

    res.json(complianceRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Generate Report for Compliance and Risk Management
exports.generateReport = async (req, res) => {
  const { employeeId, reportType, reportFile } = req.body;

  try {
    const complianceRecord = await ComplianceRiskManagement.findOne({
      employee: employeeId,
    });

    if (!complianceRecord) {
      return res.status(404).json({ message: "Compliance record not found" });
    }

    const newReport = {
      reportType,
      reportDate: new Date(),
      reportFile,
    };

    complianceRecord.reports.push(newReport);
    await complianceRecord.save();

    res.json(complianceRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
