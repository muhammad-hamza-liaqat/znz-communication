const express = require("express");
const postRouter = express.Router();
const { addingPost, myPost } = require("../../controller/Post/postController");
const { upload } = require("../../middleware/multer");
const checkExistingToken = require("../../middleware/previousToken")
postRouter.route("/add-post").post(upload.single("image"),addingPost);
postRouter.route("/my-post").get(checkExistingToken,myPost);

module.exports = postRouter