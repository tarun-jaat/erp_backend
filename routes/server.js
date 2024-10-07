// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");

// const userAuth = require("./routes/userRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const sendEmails = require("./routes/EmailCampaignManagement");
// const dotenv = require("dotenv");

// dotenv.config();

// const port = process.env.AUTHPORT || 9001;

// const connect = () => {
//   mongoose
//     .connect(process.env.DATABASE_URL)
//     .then(() => console.log("DB Connected Successfully 🔥"))
//     .catch((error) => {
//       console.log("DB Connection Failed");
//       console.error(error);
//       process.exit(1);
//     });
// };

// connect();

// app.use(express.json());

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/user", userAuth);
// app.use("/api/v1/contact", contactRoutes);
// app.use("/api/v1/emailManagement", sendEmails);

// // Routes for Employee
// app.use("/api/employee", require("./routes/employeeRoutes"));

// // Routes for Documents of Employee
// app.use("/api/documents", require("./routes/documentRoutes"));

// // Routes for OrgCharts of Emplaoyee
// app.use("/api/orgchart", require("./routes/orgChartRoutes"));

// // Routes for Recruitment and Onbaording
// app.use("/api/recruitment", require("./routes/recuritmentOnboarding"));

// // Routes for Performance and Onboarding
// app.use("/api/performance-onboarding", require("./routes/performanceRoutes"));

// // Route for Learning and Development
// app.use("/learning-and-development", require("./routes/LearnDevelopRoutes"));

// // Route for Compensation and Benefits
// app.use(
//   "/compensation-and-benefits",
//   require("./routes/CompensationBenefitsRoutes")
// );

// // Route for HR Analytics and Reporting
// app.use("/hr-analytics-reporting", require("./routes/HRAnalyticsRoutes"));

// // Route for Exit Management
// app.use("/exit-management", require("./routes/ExitManagementRoutes"));

// app.use("/api/account-fianance", require("./routes/AccountFinanceRoutes"))


// app.listen(port, () => console.log(`Server running on port ${port}`));
