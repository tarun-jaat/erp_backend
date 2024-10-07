const ExitManagement = require("../model/ExitManagement");
const Employee = require("../model/Employee");

// Create Exit Record and Generate Letters
exports.createExitRecord = async (req, res) => {
  const { employeeId, exitDate, feedback } = req.body;

  try {
    let employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    let exitRecord = new ExitManagement({
      employee: employeeId,
      exitDate,
      feedback,
      documents: {
        relievingLetter: `/documents/${employeeId}/relieving-letter.pdf`,
        experienceLetter: `/documents/${employeeId}/experience-letter.pdf`,
      },
    });

    await exitRecord.save();

    res.json(exitRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Exit Record by Employee ID
exports.getExitRecord = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const exitRecord = await ExitManagement.findOne({ employee: employeeId })
      .populate("employee", "firstName lastName position")
      .exec();

    if (!exitRecord) {
      return res.status(404).json({ message: "Exit record not found" });
    }

    res.json(exitRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Mark Exit Process as Completed
exports.completeExitProcess = async (req, res) => {
  const { employeeId } = req.params;

  try {
    let exitRecord = await ExitManagement.findOne({ employee: employeeId });

    if (!exitRecord) {
      return res.status(404).json({ message: "Exit record not found" });
    }

    exitRecord.isProcessed = true;
    await exitRecord.save();

    res.json(exitRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};