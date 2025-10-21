const express = require('express');
const { trending, popular, multiSearch, combinedContent, getAllMovies } = require('../controllers/tmdbController');

const router = express.Router();

const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

router.get('/trending', wrap(trending));
router.get('/popular', wrap(popular));
router.get('/search', wrap(multiSearch));
router.get('/', wrap(combinedContent));
router.get('/movies', wrap(getAllMovies));

module.exports = router;