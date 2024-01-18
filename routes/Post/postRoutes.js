const express = require("express");
const postRouter = express.Router();
const { addingPost } = require("../../controller/Post/postController")
postRouter.route("/add-post").post(addingPost);


module.exports = postRouter