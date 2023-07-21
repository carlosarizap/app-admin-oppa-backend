const express = require('express');
const multer = require('multer');
const path = require('path');
const expressStatic = require('express-static'); // Import the 'express-static' module

const uploadImageRouter = express.Router();

// Define the storage and upload configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = path.join(__dirname, '../images');
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

// Handle the POST request to upload the image
uploadImageRouter.post('/', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  console.log(imagePath)
  res.json({ message: 'Image uploaded successfully', imagePath });
});

// Serve static files from the 'images' directory
uploadImageRouter.use('/images', express.static(path.join(__dirname, '../images')));

module.exports = uploadImageRouter;
