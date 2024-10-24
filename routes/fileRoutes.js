// fileRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadContacts } = require('./fileController');
const { protect } = require('../auth/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadContacts);

module.exports = router;
