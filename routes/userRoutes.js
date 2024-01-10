const express = require("express");
const userRoutes = express.Router();
const { forgotPassword, setPassword } = require("../controller/userController")

userRoutes.route("/forgot-password").patch(forgotPassword);
userRoutes.route("/set-password/:email").patch(setPassword)

module.exports = userRoutes