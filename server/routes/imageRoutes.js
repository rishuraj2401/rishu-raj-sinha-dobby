const express = require('express');
const { uploadImage, getUserImages } = require('../controllers/imageController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const router = express.Router();

router.post('/',authMiddleware, uploadImage);
router.get('/', authMiddleware, getUserImages);

module.exports = router;
