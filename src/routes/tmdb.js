const express = require('express');
const { trending } = require('../controllers/tmdbController');

const router = express.Router();

const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

router.get('/trending', wrap(trending));

module.exports = router;