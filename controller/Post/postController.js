const postModel = require("../../models/postModel");
const { checkJWT } = require("../../middleware/authenticationMiddleware");
const cloudinary = require("cloudinary").v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_Api_key,
  api_secret: process.env.cloud_Api_Secret_key,
});

const addingPost = async (req, res) => {


  try {
    const { post } = req.body;

    if (!post) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Post content is required" });
    }

    if (req.file) {
      console.log("Uploaded file:", req.file);

      const userEmail = req.userEmail;

      // configured cloudinary 
      const cloudinaryStream = cloudinary.uploader.upload_stream(async (error, result) => {
        if (error) {
          console.error("Error in Cloudinary upload:", error);
          return res
            .status(500)
            .json({
              statusCode: 500,
              message: "Internal server error",
              error: error.message,
            });
        }

        if (!result) {
          console.error("Cloudinary did not return a result");
          return res
            .status(500)
            .json({
              statusCode: 500,
              message: "Internal server error",
              error: "Cloudinary did not return a result",
            });
        }

        console.log("Cloudinary Response:", result);

        const postAdd = await postModel.create({
          email: userEmail,
          post,
          images: [result.secure_url],
        });

        return res.status(201).json({
          statusCode: 201,
          message: "Post added successfully",
          postAdd,
        });
      });

      // Pipe the buffer to Cloudinary
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(cloudinaryStream);
    } else {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Image file is required" });
    }
  } catch (error) {
    console.error("Error in adding post:", error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const myPost = async (req, res) => {
  try {
    const userEmail = req.userEmail; // Access user email from the request object

    const data = await postModel.findAndCountAll({
      where: { email: userEmail },
    });

    if (!data || data.count === 0) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "No posts found", data: data });
    }

    return res
      .status(200)
      .json({ statusCode: 200, message: "All posts fetched", data: data.rows });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = { addingPost, myPost };
