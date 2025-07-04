const express = require("express")
const router = express.Router();

// router
const {auth} = require("../middlewares/auth");
const { login , signUp , sendOTP , changePassword} = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

// authentication routes

router.post("/login",login );
router.post("/signUp", signUp);
router.post("/sendOtp", sendOTP);
router.put("/changePassword", auth, changePassword); ///here the auth middleware  is used to check authentication of the user like it has a valid token or not. and apn ne yaha ye auth middlwawrre islue use kiya he kyuki changepassword route ko apne  ko protected  banana padega nahi to koi bhi user bina login kiye kisi ka bhi password change kar dega .  

// reset 

console.log(resetPasswordToken);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);

module.exports = router;