const listsService = require('../services/lists');

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
    const listId = req.params.listId;
    const { tmdbId, title, overview, posterPath, releaseDate, voteAverage } = req.body;

    try {
        const updatedList = await listsService.addMovieToList(listId, { tmdbId, title, overview, posterPath, releaseDate, voteAverage });
        return res.json(updatedList);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function removeMovieFromList(req, res) {
    const { listId, movieId } = req.params;

    try {
        const updatedList = await listsService.removeMovieFromList(listId, movieId);
        return res.json(updatedList);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createList, getLists, getList, deleteList, addMovieToList, removeMovieFromList };