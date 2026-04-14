const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');

router.post('/', controller.createPost);
router.get('/', (req, res) => res.json(require('../data/posts')));
router.get('/:postId', controller.getPostById);
router.put('/:postId/platforms/:platform', controller.updatePlatformStatus);
router.post('/:postId/publish', controller.publishPost);

module.exports = router;