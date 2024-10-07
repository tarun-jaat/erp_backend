const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const User = require("../model/userModel");

exports.enable2FA = async (req, res) => {
  // Retrieve JWT from Authorization header
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split(" ")[1];
  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  try {
    // Verify the JWT token to get the userId (custom string ID)
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    const userId = decoded.userId; // Ensure this matches how you're encoding the userId in your JWT
    console.log("Decoded JWT:", decoded);

    // Generate a secret key for 2FA
    const secret = speakeasy.generateSecret({
      name: "Company Name", // Customize this with the app name and user email
    });

    // Save the 2FA secret to the user's document
    await User.findOneAndUpdate(
      { userId }, // Ensure this is the correct identifier for your user
      { twoFASecret: secret.base32 }, // Save the base32 secret
      { new: true } // Return the updated document
    );

    // Generate a QR code for the secret
    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error generating QR code" });
      }
      return res.json({
        message: "2FA enabled",
        qrCode: data,
        secret: secret.base32,
      });
    });
  } catch (err) {
    console.error("Error enabling 2FA:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.verify2FA = async (req, res) => {
  const { token } = req.body; // OTP entered by the user
  console.log("Received OTP Token:", token);

  // Retrieve JWT from Authorization header
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split(" ")[1];
  if (!bearerToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  try {
    // Verify the JWT token to get the userId (custom string ID)
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("Decoded JWT:", decoded);

    // Retrieve the full user document
    const user = await User.findOne({ userId }).exec();
    console.log("Full user object from DB:", user);

    if (!user || !user.twoFASecret) {
      return res.status(400).json({ message: "User or 2FA secret not found" });
    }

    console.log("User's 2FA Secret:", user.twoFASecret);

    // Verify the OTP token using speakeasy
    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: "base32",
      token: token, // OTP entered by the user
      window: 1, // Allow for a time discrepancy of 1 interval
    });

    if (verified) {
      return res.json({ message: "2FA token verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP token" });
    }
  } catch (err) {
    console.error("Error verifying 2FA:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

