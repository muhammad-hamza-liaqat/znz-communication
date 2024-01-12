const express = require("express");
const userRoutes = express.Router();
const { forgotPassword, setPassword, userDashboard, logout } = require("../controller/userController")
const {checkJWT }= require("../middleware/authenticationMiddleware")
userRoutes.route("/forgot-password").patch(forgotPassword);
userRoutes.route("/set-password/:email").patch(setPassword);
userRoutes.route("/dashboard").get(checkJWT,userDashboard)
userRoutes.route("/logout").post(checkJWT,logout)

module.exports = userRoutes