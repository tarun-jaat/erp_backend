const express = require("express")

const router = express.Router();

const interviewController = require("../controllers/interviewController")

const jobPostingController = require("../controllers/jobPostingController")

const onboardingController = require("../controllers/onBoardingController")

router.post("/create-job-posting", jobPostingController.createJobPosting)

router.get("/get-job-posting", jobPostingController.getAllJobPostings)

router.patch("/update-applicant-job-posting/:jobId/:applicantId", jobPostingController.updateApplicantStatus)

router.post("/apply-job-posting/:jobId/apply", jobPostingController.applyForJob)

router.post("/create-interview", interviewController.scheduleInterview)

router.post('/create-onbaording-task', onboardingController.createOnboardingTask)

module.exports = router;