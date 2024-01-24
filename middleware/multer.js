const multer = require("multer")
const path=require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Conditionally generate filename based on post content
    const fileName = req.body.post ? Date.now() + '-' + file.fieldname + path.extname(file.originalname) : '';
    cb(null, fileName);
  }
});
  
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // will accept only png jpeg gif format image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    }
  },
  // can add upto 10 images at the same time
  array: 10, 
});

  module.exports ={ upload }