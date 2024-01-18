const express = require("express");
const postRouter = express.Router();
const { addingPost } = require("../../controller/Post/postController");
const { upload } = require("../../middleware/multer");

postRouter.route("/add-post").post(upload.single("image"),addingPost);


module.exports = postRouter