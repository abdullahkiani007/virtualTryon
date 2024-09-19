const express = require('express');
const multer = require('multer');
const tryonController = require('../controllers/tryonController.js');

// Set up Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Define the route and associate it with the controller
router.post(
  '/',
  upload.fields([{ name: 'userImage' }, { name: 'clothImage' }]),
  tryonController.handleTryOn
);

router.post(
    '/test',
    upload.fields([{ name: 'userImage' }, { name: 'clothImage' }]),
    (req, res) => {
        res.status(200).json({ message: 'Tryon route working' });
    }
)

module.exports = router