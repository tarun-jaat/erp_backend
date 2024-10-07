const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
  },
  contactNumber:{
    type: Number,
    // required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// async function sendVerification(email, otp) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Verification Code",
//       `Your verification code is ${otp}`
//     );
//     console.log("Email Sent SuccessFully", mailResponse);
//   } catch (err) {
//     console.log("Error Occured", err);
//     throw err;
//   }
// }

// OTPSchema.pre("save", async function (next) {
//   console.log("New Document Saved");
//   if (this.isNew) {
//     await sendVerification(this.email, this.otp);
//   }
//   next();
// });

module.exports = mongoose.model("OTP", OTPSchema);
