const Favorite = require('../models/Favorite');

async function createFavorite(data) {
    return Favorite.create({
        userId: data.userId,
        tmdbId: data.tmdbId,
        title: data.title,
        overview: data.overview,
        posterPath: data.posterPath,
        releaseDate: data.releaseDate,
        voteAverage: data.voteAverage,
        status: data.status,
        comment: data.comment,
        rating: data.rating
    });
}

async function updateFavorite(userId, tmdbId, data) {
    return Favorite.findOneAndUpdate({ userId, tmdbId }, data, { new: true });
}

async function listFavoritesByUser(userId) {
    return Favorite.find({ userId }).sort({ createdAt: -1 });
}

async function deleteFavoriteByUserAndTmdbId(userId, tmdbId) {
    return Favorite.findOneAndDelete({ userId, tmdbId });
}

module.exports = {
    createFavorite,
    listFavoritesByUser,
    deleteFavoriteByUserAndTmdbId,
    updateFavorite
};