const express = require('express');
const multer = require('multer');
const authenticate = require('../middleware/authMiddleware');
const { uploadResume, getProfile } = require('../controllers/studentController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/profile', authenticate, getProfile);
router.post('/upload-resume', authenticate, upload.single('resume'), uploadResume);

module.exports = router;
