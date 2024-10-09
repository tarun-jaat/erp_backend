const OnboardingTask = require("../model/onBoarding");
const Employee = require("../model/Employee"); // Assuming you have an Employee model

exports.createOnboardingTask = async (req, res) => {
  const { employeeID, taskName, dueDate } = req.body;

  try {
    // Check if the employee with the provided ID exists
    const employee = await Employee.findById(employeeID);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Create a new onboarding task
    const onboardingTask = new OnboardingTask({
      employeeID: employee._id, // Use the correct ObjectId
      taskName,
      dueDate,
    });

    await onboardingTask.save();
    res.status(201).json(onboardingTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getOnboardingTask = async (req, res) => {
  try {
    // Find all onboarding tasks and populate the employeeId with Employee details
    const onboardingTasks = await OnboardingTask.find()
      .populate({
        path: "employeeID",
        select: "employeeID", // Select the specific fields you want from Employee schema
      })
      .exec();
    // If tasks are found, return them with employee details
    res.json(onboardingTasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteOnboardingTask = async (req, res) => {
  try {
    // Find and delete the onboarding task using the provided ID
    const onboardingTask = await OnboardingTask.findByIdAndDelete(
      req.params.id
    );
    if (!onboardingTask) {
      return res.status(404).json({ message: "Onboarding task not found" });
    }
    res.json({ message: "Onboarding task deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
