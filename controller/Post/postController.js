const postModel = require("../../models/postModel");
const jwt = require("jsonwebtoken");

const addingPost = async (req, res) => {
  try {
    const { post } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "JWT token missing" });
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(accessToken, process.env.Secret_KEY);
    const userEmail = decoded.email;

    if (!post) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Post content is required" });
    }

    // Check if a file is present in the request
    if (req.file) {
      // Save post only if content is present
      const postAdd = await postModel.create({
        email: userEmail,
        post,
        image: req.file.path,
      });

      return res.status(201).json({
        statusCode: 201,
        message: "Post added successfully",
        postAdd,
      });
    } else {
      // Handle case where no file is uploaded
      return res
        .status(400)
        .json({ statusCode: 400, message: "Image file is required" });
    }
  } catch (error) {
    console.error("Error in adding post:", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

module.exports = { addingPost };
