const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

// Route for uploading files
router.post('/upload', authMiddleware, uploadMiddleware.single('file'), fileController.uploadFile);

// Route for downloading files
router.get('/download/:id', authMiddleware, fileController.downloadFile);

// Route for getting list of files
router.get('/', authMiddleware, fileController.getFiles);

module.exports = router;