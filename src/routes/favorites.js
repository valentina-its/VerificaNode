const express = require('express');
const { addFavorite, listFavorites, removeFavorite } = require('../controllers/favoritesController');

const router = express.Router();

const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

router.post('/', wrap(addFavorite));
router.get('/', wrap(listFavorites));
router.delete('/:tmdbId', wrap(removeFavorite));

module.exports = router;