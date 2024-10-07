const Sales = require("../model/salesSchema");
const User = require("../model/userModel");
exports.createSalesRecord = async (req, res) => {
  try {
    const salesRecord = new Sales(req.body);
    await salesRecord.save();
    res.status(201).json(salesRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalesRecords = async (req, res) => {
  try {
    const salesRecords = await Sales.find().populate();

    // Log the sales records to inspect the data
    console.log("Sales Records:", salesRecords);

    // Format the response to include firstName in each sales record
    const formattedRecords = salesRecords.map((record) => ({
      ...record.toObject(),
      userFirstName: record.user ? record.user.firstName : null,
    }));

    // Log the formatted records to inspect the output
    console.log("Formatted Records:", formattedRecords);

    res.json(formattedRecords);
  } catch (err) {
    console.error("Error fetching sales records:", err.message); // Log the error
    res.status(500).json({ message: err.message });
  }
};

exports.updateSalesRecord = async (req, res) => {
  try {
    const salesRecord = await Sales.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(salesRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSalesRecord = async (req, res) => {
  try {
    await Sales.findByIdAndDelete(req.params.id);
    res.json({ message: "Sales record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalesRecordsById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Find the sales record by ID and populate the user first name
    const salesRecord = await Sales.findById(id).populate("user", "firstName");

    // Log the sales record to inspect the data
    console.log("Sales Record:", salesRecord);

    // Check if the sales record was found
    if (!salesRecord) {
      return res.status(404).json({ message: "Sales record not found." });
    }

    // Format the response to include firstName in the sales record
    const formattedRecord = {
      ...salesRecord.toObject(),
      userFirstName: salesRecord.user ? salesRecord.user.firstName : null,
    };

    // Log the formatted record to inspect the output
    console.log("Formatted Record:", formattedRecord);

    res.json(formattedRecord); // Send the formatted record as the response
  } catch (err) {
    console.error("Error fetching sales record:", err.message); // Log the error
    res.status(500).json({ message: err.message });
  }
};

