const express = require("express");
const authRoutes = express.Router();
const { registerUser, loginUser } = require("../controller/authController");


authRoutes.route("/register-user").post(registerUser)
authRoutes.route("/login").get(loginUser)

module.exports = authRoutes