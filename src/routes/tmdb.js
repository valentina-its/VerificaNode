const express = require('express');
const { trending, popular, multiSearch, combinedContent } = require('../controllers/tmdbController');

const router = express.Router();

router.get('/trending', trending);
router.get('/search', multiSearch);
router.get('/popular', popular);
router.get('/', combinedContent);

module.exports = router;