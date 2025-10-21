const express = require('express');
const { trending, getAllMovies } = require('../controllers/tmdbController');

const router = express.Router();

const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

router.get('/trending', wrap(trending));
router.get('/movies', wrap(getAllMovies));

module.exports = router;