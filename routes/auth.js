const express = require("express");
const authRoutes = express.Router();
const { registerUser, loginUser, googleLoginPage, googleLogin, googleCallback } = require("../controller/authController");


authRoutes.route("/register-user").post(registerUser);
authRoutes.route("/login").post(loginUser);
authRoutes.route("/google/login").get(googleLoginPage);


module.exports = authRoutes