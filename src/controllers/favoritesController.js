const favoritesService = require('../services/favoritesServices');

async function addFavorite(req, res) {
    const userId = req.userId;
    const { tmdbId, title, overview, posterPath, releaseDate, voteAverage } = req.body;

    const idNum = parseInt(tmdbId, 10);
    if (!Number.isFinite(idNum) || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ message: 'Favorite input not valid' });
    }

    try {
        const fav = await favoritesService.createFavorite({
            userId,
            tmdbId: idNum,
            title: title.trim(),
            overview,
            posterPath,
            releaseDate,
            voteAverage
        });
        return res.status(201).json(fav);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Film already in favorites' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function listFavorites(req, res) {
    const userId = req.userId;
    const items = await favoritesService.listFavoritesByUser(userId);
    return res.json(items);
}

async function removeFavorite(req, res) {
    const userId = req.userId;
    const idNum = parseInt(req.params.tmdbId, 10);
    if (!Number.isFinite(idNum)) {
        return res.status(400).json({ message: 'tmdbId not valid' });
    }
    const deleted = await favoritesService.deleteFavoriteByUserAndTmdbId(userId, idNum);
    if (!deleted) {
        return res.status(404).json({ message: 'Favorite not found' });
    }
    return res.status(204).send();
}

module.exports = { addFavorite, listFavorites, removeFavorite };