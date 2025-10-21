const express = require('express');
const { createList, getLists, getList, deleteList, addMovieToList, removeMovieFromList } = require('../controllers/listsController');

const router = express.Router();

const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

router.post('/', wrap(createList));
router.get('/', wrap(getLists));
router.get('/:listId', wrap(getList));
router.delete('/:listId', wrap(deleteList));
router.post('/:listId/movies', wrap(addMovieToList));
router.delete('/:listId/movies/:movieId', wrap(removeMovieFromList));

module.exports = router;