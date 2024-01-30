const userModel = require("../../models/userModel");
const postModel = require("../../models/postModel");
const likePostModel = require("../../models/likepostModel");



const likePost = async (req, res) => {
  const { likePostID } = req.body;
  likeUserEmail = req.userEmail;
  if (!likePostID || !likeUserEmail) {
    return res.status(400).json({
      statusCode: 400,
      message: "likePostID or likeUserEmail is missing",
    });
  }
  try {
    const userExist = await userModel.findOne({
      where: { email: likeUserEmail },
    });
    if (!userExist) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "user not found" });
    }

    const postExist = await postModel.findOne({
      where: { postID: likePostID },
    });
    if (!postExist) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "post not found" });
    }
    const addLike = await likePostModel.create({
      likeUserID: likeUserEmail,
      likePostID: likePostID,
    });
    console.log(`${likeUserEmail} liked post against ${postExist.postID}`);
    return res
      .status(200)
      .json({ statusCode: 200, message: "liked the post", data: addLike });
  } catch (error) {
    console.log("internal server error-likePost Controller", error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "internal server error",
        error: error,
      });
  }
};

module.exports = { likePost };
