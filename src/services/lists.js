const List = require('../models/List');
const mongoose = require('mongoose');

async function createList(data) {
    return List.create({
        userId: data.userId,
        title: data.title,
        description: data.description
    });
}

async function getListsByUser(userId) {
    return List.find({ userId }).sort({ createdAt: -1 });
}

async function getListById(listId) {
    return List.findById(listId);
}

async function deleteListById(listId) {
    return List.findByIdAndDelete(listId);
}

async function addMovieToList(listId, movieData) {
    const movieWithDefaults = {
        ...movieData,
        rating: null,
        comment: '',
        status: 'da vedere'
    };

    return List.findByIdAndUpdate(
        listId,
        { $push: { movies: movieWithDefaults } },
        { new: true }
    );
}

async function removeMovieFromList(listId, movieId) {
    const movieObjectId = new mongoose.Types.ObjectId(movieId);
    return List.findByIdAndUpdate(
        listId,
        { $pull: { movies: { _id: movieObjectId } } },
        { new: true }
    );
}

async function updateMovieInList(listId, movieId, data) {
    const movieObjectId = new mongoose.Types.ObjectId(movieId);

    const set = {};
    if (data.rating !== undefined) set['movies.$.rating'] = data.rating;
    if (data.comment !== undefined) set['movies.$.comment'] = data.comment;
    if (data.status !== undefined) set['movies.$.status'] = data.status;

    return List.findOneAndUpdate(
        { _id: listId, 'movies._id': movieObjectId },
        { $set: set },
        { new: true }
    );
}

module.exports = {
    createList,
    getListsByUser,
    getListById,
    deleteListById,
    addMovieToList,
    removeMovieFromList,
    updateMovieInList
};