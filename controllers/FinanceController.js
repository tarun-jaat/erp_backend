const FinancialReport = require("../model/FinanceReportSchema");

exports.generateFinancialReport = async (req, res) => {
  try {
    const report = new FinancialReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFinancialReports = async (req, res) => {
  try {
    const reports = await FinancialReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
