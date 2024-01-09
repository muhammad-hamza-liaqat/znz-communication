const express = require("express");
const authRoutes = express.Router();
const { registerUser } = require("../controller/authController")
authRoutes.route("/register-user").post(registerUser)


module.exports = authRoutes