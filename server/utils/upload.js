const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Naming the file
  }
});

// Set up multer upload
const upload = multer({ storage: storage });

module.exports = upload;
  