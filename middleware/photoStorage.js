const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require("dotenv").config();

const url = process.env.MONGODB_URL;

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url,
    file: (req, file) => {
      //If it is an image, save to photos bucket
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        return {
          bucketName: "profile_photos",
          filename: `${Date.now()}_${file.originalname}`,
        }
      } else {
        //Otherwise save to default bucket
        return `${Date.now()}_${file.originalname}`
      }
    },
  });
  
exports.upload = multer({ storage });