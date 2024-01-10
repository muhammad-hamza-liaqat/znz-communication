const express = require("express");
const userRoutes = express.Router();
const { forgotPassword } = require("../controller/userController")

userRoutes.route("/forgot-password").post(forgotPassword);

module.exports = userRoutes