const userAuth = require("../controllers/AuthController");
const express = require("express");
const resetPassword = require("../controllers/ResetPassword");
const multifactor = require("../controllers/Multifactor")
const router = express.Router();

router.post("/login", userAuth.signin);
router.post("/signup", userAuth.signup);
router.post("/sendotp", userAuth.sendotp);
router.post("/changePassword", userAuth.changePassword);

router.post("/reset-password-token", resetPassword.resetPasswordToken);
router.post("/reset-password", resetPassword.resetPassword);

router.post("/enable2fa",multifactor.enable2FA)
router.post("/verify2FA",multifactor.verify2FA)

module.exports=router