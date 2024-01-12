const express = require("express");
const userRoutes = express.Router();
const { forgotPassword, setPassword, userDashboard } = require("../controller/userController")
const {checkJWT }= require("../middleware/authenticationMiddleware")
userRoutes.route("/forgot-password").patch(forgotPassword);
userRoutes.route("/set-password/:email").patch(setPassword);
userRoutes.route("/dashboard").get(checkJWT,userDashboard)


module.exports = userRoutes