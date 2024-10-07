const mailSender = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../utils/MailTemplates/passwordUpdated");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const OTP = require("../model/OTPModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      otp,
      gender,
      role,
      address,
    } = req.body;

    // Validate required fields
    // if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
    // 	return res.status(400).json({
    // 		success: false,
    // 		message: "All required fields must be provided",
    // 	});
    // }

    // Check if password and confirm password match
    // if (password !== confirmPassword) {
    // 	return res.status(400).json({
    // 		success: false,
    // 		message: "Passwords do not match",
    // 	});
    // }

    // Check if user already exists
    const existingUser = await User.findOne({ contactNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in.",
      });
    }

    // Find the most recent OTP for the email
    const latestOTP = await OTP.findOne({ contactNumber }).sort({ createdAt: -1 });
    if (!latestOTP || otp !== latestOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    function generateUserId(sequenceNumber) {
      const now = new Date();
      // const day = String(now.getDate()).padStart(2, '0');
      // const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = now.getFullYear();

      const datePart = `${year}`;
      const uniquePart = String(sequenceNumber).padStart(3, "0"); // Pad sequence number to ensure it has 3 digits

      return `${datePart}${uniquePart}-${uuidv4()}`;
    }

    // Example usage
    let sequenceNumber = 1;
    const userId = generateUserId(sequenceNumber);
    console.log(userId);

    // Generate a unique user ID

    // Set default approval based on role
    const approved = role !== "Employee";

    // Generate profile picture URL
    const profilePicture = `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`;

    // Create the user
    const user = await User.create({
      userId,
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      gender,
      role: role || "Employee", // Default to "Employee"
      profilePicture,
      address,
      isActive: true,
    });

    // Respond with success
    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

// exports.sendotp = async (req, res) => {
//     try {
//       const { email } = req.body;
//       // Validate email format
//       if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid email format. Please provide a valid email.",
//         });
//       }
//       // Check if user is already registered
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(409).json({
//           success: false,
//           message: "User is already registered with this email.",
//         });
//       }
//       // Generate a unique OTP
//       let otp;
//       let otpExists;
//       do {
//         otp = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//           lowerCaseAlphabets: false,
//           specialChars: false,
//           digits: true,
//         });
//         otpExists = await OTP.findOne({ otp });
//       } while (otpExists);

//       // Save OTP in the database
//       const otpPayload = { email, otp };
//       const otpDocument = await OTP.create(otpPayload);
//       console.log(otpDocument)

//       // Send OTP to the user's email
//       // Assuming you have a function sendEmail(email, subject, message) to handle email sending
//       await mailSender(email, "Your OTP Code", `Your OTP code is ${otp}. It is valid for 5 minutes.`

//       );

//       res.status(200).json({
//         success: true,
//         message: "OTP sent successfully to your email.",
//       });
//     } catch (error) {
//       console.error("Error in sendotp controller:", error);
//       res.status(500).json({
//         success: false,
//         message: "An error occurred while sending OTP. Please try again.",
//       });
//     }
//   };

exports.sendotp = async (req, res) => {
  try {
    const { contactNumber } = req.body;
    console.log(contactNumber);
    // Validate mobile number format (assuming it's a 10-digit number for example)
    const existingUser = await User.findOne({ contactNumber });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User is already registered with this mobile number.",
      });
    }

    // Generate a unique OTP
    let otp;
    let otpExists;
    do {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      otpExists = await OTP.findOne({ otp });
    } while (otpExists);

    // Save OTP in the database
    const otpPayload = { contactNumber, otp };
    const otpDocument = await OTP.create(otpPayload);
    console.log("Generated OTP:", otp); // Log OTP to console instead of sending it

    res.status(200).json({
      success: true,
      message: "OTP generated successfully and sent to the console.",
    });
  } catch (error) {
    console.error("Error in sendotp controller:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating OTP. Please try again.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Check if identifier (email or userId) and password are provided
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID/Email and Password are required",
      });
    }

    // Find the user by email or userId
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { userId: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid User ID/Email or password",
      });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid User ID/Email or password",
      });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    // Invalidate previous token by generating a new token and saving it
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Update the user's token in the database (logs out previous session)
    user.token = token;
    await user.save();

    // Return the JWT token and user info
    return res.status(200).json({
      success: true,
      token,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign-in. Please try again.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // Extract user ID from req.user
    const userId = req.user.id;

    // Fetch user details from the database
    const userDetails = await User.findById(userId);

    // Validate user existence
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Destructure the old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Ensure all required fields are provided
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (oldPassword, newPassword, confirmNewPassword) are required",
      });
    }

    // Validate the old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    // Check if the new password is the same as the old password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password",
      });
    }

    // Ensure new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Encrypt the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const updatedUserDetails = await User.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );

    // Ensure password update was successful
    if (!updatedUserDetails) {
      return res.status(500).json({
        success: false,
        message: "Failed to update password",
      });
    }

    // Send notification email about password update
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "ERP - Password Updated",
        passwordUpdated(
          updatedUserDetails.firstName,
          `Dear ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}, your password has been successfully updated.`
        )
      );
      console.log(
        "Password update notification sent successfully:",
        emailResponse.response
      );
    } catch (error) {
      console.error("Error sending password update notification email:", error);
      return res.status(500).json({
        success: false,
        message: "Password updated, but failed to send notification email",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    // Log any errors that occur during the password update process
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password",
    });
  }
};
