const listsService = require('../services/lists');
const { fetchMovieById } = require('../services/tmdbServices');
const mongoose = require('mongoose');

async function createList(req, res) {
    const userId = req.userId;
    const { title, description } = req.body;

    if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ message: 'List title is required' });
    }

    try {
        const list = await listsService.createList({ userId, title, description });
        return res.status(201).json(list);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getLists(req, res) {
    const userId = req.userId;
    const lists = await listsService.getListsByUser(userId);
    return res.json(lists);
}

async function getList(req, res) {
    const listId = req.params.listId;
    const list = await listsService.getListById(listId);
    if (!list) {
        return res.status(404).json({ message: 'List not found' });
    }
    return res.json(list);
}

async function deleteList(req, res) {
    const listId = req.params.listId;
    const deleted = await listsService.deleteListById(listId);
    if (!deleted) {
        return res.status(404).json({ message: 'List not found' });
    }
    return res.status(204).send();
}

async function addMovieToList(req, res) {
    const userId = req.userId;
    const listId = req.params.listId;
    const { tmdbId } = req.body;

    const idNum = parseInt(tmdbId, 10);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        return res.status(400).json({ message: 'tmdbId not valid' });
    }


    const list = await listsService.getListById(listId);
    if (!list) {
        return res.status(404).json({ message: 'List not found' });
    }
    if (String(list.userId) !== String(userId)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const exists = (list.movies || []).some(m => m.tmdbId === idNum);
    if (exists) {
        return res.status(409).json({ message: 'Movie already in list' });
    }

    try {
      
        const data = await fetchMovieById(idNum);
        const movieData = {
            tmdbId: idNum,
            title: data.title,
            overview: data.overview,
            posterPath: data.poster_path || null,
            releaseDate: data.release_date || null,
            voteAverage: data.vote_average
        };

        const updatedList = await listsService.addMovieToList(listId, movieData);
        return res.status(201).json(updatedList);
    } catch (err) {
        return res.status(502).json({ message: 'TMDB service error' });
    }
}

async function removeMovieFromList(req, res) {
    const userId = req.userId;
    const { listId, movieId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: 'movieId not valid' });
    }

    const list = await listsService.getListById(listId);
    if (!list) {
        return res.status(404).json({ message: 'List not found' });
    }
    if (String(list.userId) !== String(userId)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const exists = (list.movies || []).some(m => String(m._id) === String(movieId));
    if (!exists) {
        return res.status(404).json({ message: 'Movie not found in list' });
    }

    try {
        const updatedList = await listsService.removeMovieFromList(listId, movieId);
        return res.json(updatedList);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createList, getLists, getList, deleteList, addMovieToList, removeMovieFromList };