const express = require("express");
const postRouter = express.Router();
const { addingPost, myPost } = require("../../controller/Post/postController");
const { upload } = require("../../middleware/multer");

postRouter.route("/add-post").post(upload.single("image"),addingPost);
postRouter.route("/my-post").get(myPost);

module.exports = postRouter