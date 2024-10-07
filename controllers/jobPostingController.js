const JobPosting = require("../model/JobPostingSchema");

exports.createJobPosting = async (req, res) => {
  const { title, description, skillsRequired } = req.body;

  try {
    const jobPosting = new JobPosting({
      title,
      description,
      skillsRequired,
    });

    await jobPosting.save();
    res.status(201).json(jobPosting);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { name, email, resume } = req.body;

  try {
    let jobPosting = await JobPosting.findById(jobId);

    if (!jobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    jobPosting.applicants.push({ name, email, resume });
    await jobPosting.save();

    res.status(200).json({ message: "Application submitted", jobPosting });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.updateApplicantStatus = async (req, res) => {
  const { jobId, applicantId } = req.params;
  const { newStatus } = req.body; // Expecting the new status in the body

  try {
    const jobPosting = await JobPosting.findById(jobId);

    if (!jobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    // Find the applicant and update the status
    const applicant = jobPosting.applicants.id(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = newStatus;
    await jobPosting.save();

    res.status(200).json({ message: "Applicant status updated", jobPosting });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
