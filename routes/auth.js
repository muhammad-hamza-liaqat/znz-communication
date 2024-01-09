const express = require("express");
const authRoutes = express.Router();
const { registerUser } = require("../controller/authController")
authRoutes.route("/register-user").get(registerUser)


module.exports = authRoutes