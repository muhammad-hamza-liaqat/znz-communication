const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

// Middleware to handle file upload
const handleFileUpload = (req, res, next) => {
  // Multer middleware for handling file upload
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
        error: err.message,
      });
    }

    // Check if file is missing in request
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "Missing required parameter - file",
      });
    }

    console.log("File Uploaded Successfully!");
    next();
  });
};

module.exports = {handleFileUpload}