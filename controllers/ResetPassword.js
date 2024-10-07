const User = require("../model/userModel");
const mailSender = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate the email field
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if user exists with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No account found with this email: ${email}. Please enter a valid email.`,
            });
        }

        // Generate a reset token
        const token = crypto.randomBytes(20).toString("hex");

        // Set token and expiration date
        user.token = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        // Save the user's updated details
        await user.save();

        // Construct the reset URL
        const resetUrl = `${process.env.CLIENT_URL}/update-password/${token}`;

        // Send the reset email
        await mailSender(
            email,
            "Password Reset",
            `Your link for password reset is ${resetUrl}. Please click this link to reset your password.`
        );

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully. Please check your inbox to continue.",
        });
    } catch (error) {
        console.error("Error in sending reset password email:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the reset password email. Please try again later.",
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body;
  
      // Validate input
      if (!password || !confirmPassword || !token) {
        return res.status(400).json({
          success: false,
          message: "All fields (password, confirmPassword, token) are required.",
        });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match.",
        });
      }
  
      // Find the user by reset token
      const user = await User.findOne({ token });
  
      // Check if the token is valid
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token.",
        });
      }
  
      // Check if the token has expired
      if (user.resetPasswordExpires < Date.now()) {
        return res.status(403).json({
          success: false,
          message: "Token has expired. Please request a new password reset.",
        });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password and clear the reset token and expiration time
      await User.findOneAndUpdate(
        { token },
        {
          password: hashedPassword,
          token: null,
          resetPasswordExpires: null,
        },
        { new: true }
      );
  
      // Return success response
      return res.status(200).json({
        success: true,
        message: "Password reset successful. You can now log in with your new password.",
      });
  
    } catch (error) {
      console.error("Error in resetting password:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while resetting your password. Please try again later.",
      });
    }
  };


  