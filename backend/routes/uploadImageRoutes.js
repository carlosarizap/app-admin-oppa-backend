const express = require('express');
const multer = require('multer');
const uploadImageRouter = express.Router();

// Define the storage and upload configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the uploaded images will be stored.
    // Replace 'YOUR_DESTINATION_FOLDER' with the actual folder path on your server.
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    // Set the filename of the uploaded image.
    // You can use a unique filename here, or keep the original filename if preferred.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

// Handle the POST request to upload the image
uploadImageRouter.post('/', upload.single('image'), (req, res) => {
  // If the image was successfully uploaded, you can access the file details using 'req.file'.
  // You can store the file path or URL in your database or use it for further processing.

  const imagePath = req.file.path; // The file path where the image is stored on the server.
  
  // Send a response to the client indicating that the image was uploaded successfully.
  res.json({ message: 'Image uploaded successfully', imagePath });
});

module.exports = uploadImageRouter;
