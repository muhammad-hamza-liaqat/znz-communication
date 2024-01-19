const postModel = require("../../models/postModel");
const {checkJWT} = require("../../middleware/authenticationMiddleware")


const addingPost = async (req, res) => {
  try {
    const { post } = req.body;

    if (!post) {
      return res.status(400).json({ statusCode: 400, message: "Post content is required" });
    }

    // Check if a file is present in the request
    if (req.file) {
      const userEmail = req.userEmail; // Access user email from the request object

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
      return res.status(400).json({ statusCode: 400, message: "Image file is required" });
    }
  } catch (error) {
    console.error("Error in adding post:", error);
    return res.status(500).json({ statusCode: 500, message: "Internal server error", error: error.message });
  }
};


const myPost = async (req, res) => {
  try {
    const userEmail = req.userEmail; // Access user email from the request object

    const data = await postModel.findAndCountAll({
      where: { email: userEmail },
    });

    if (!data || data.count === 0) {
      return res.status(404).json({ statusCode: 404, message: "No posts found", data: data });
    }

    return res.status(200).json({ statusCode: 200, message: "All posts fetched", data: data.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: error.message });
  }
};




module.exports = { addingPost, myPost };
