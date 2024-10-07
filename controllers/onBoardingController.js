const OnboardingTask = require("../model/onBoarding");

exports.createOnboardingTask = async (req, res) => {
  const { employeeId, taskName, dueDate } = req.body;

  try {
    const onboardingTask = new OnboardingTask({
      employeeId,
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
