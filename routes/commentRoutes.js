const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/blog/:blogId/comments', auth, commentController.addComment);

module.exports = router;