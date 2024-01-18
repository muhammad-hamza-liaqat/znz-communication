const postModel = require("../../models/postModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    }
  }
});

const addingPost = async (req, res) => {
    try {
      const { post } = req.body;
      console.log("raw data", req.body)
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(400).json({ statusCode: 400, message: "JWT token missing" });
      }
  
      const accessToken = authHeader.split(" ")[1];
  
      const decoded = jwt.verify(accessToken, process.env.Secret_KEY);
      const userEmail = decoded.email;
  
      if (!post) {
        return res.status(400).json({ statusCode: 400, message: "Post content is required" });
      }
  
      upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
          console.error("Multer error:", err.message);
          return res.status(400).json({ statusCode: 400, message: "File upload error" });
        }
  
        // Assuming only one image is allowed (maxCount: 1)
        const images = req.files['image'].map((file) => path.join("/uploads", file.filename));
  
        const additionalDetails = await postModel.create({
          email: userEmail,
          post,
          images,
        });
  
        return res.status(201).json({
          statusCode: 201,
          message: "Post added successfully",
          information: additionalDetails,
        });
      });
    } catch (error) {
      console.error("Error in adding post:", error);
      return res.status(500).json({ statusCode: 500, message: "Internal server error" });
    }
  };
  
  module.exports = { addingPost };
  
