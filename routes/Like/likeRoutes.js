const express = require("express");
const likeRoutes = express.Router();
const { likePost } = require("../../controller/Like/likeController");

likeRoutes.route("/like-post").post(likePost);

module.exports = likeRoutes;
