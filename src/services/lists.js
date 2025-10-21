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
    return List.findByIdAndUpdate(
        listId,
        { $push: { movies: movieData } },
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

module.exports = {
    createList,
    getListsByUser,
    getListById,
    deleteListById,
    addMovieToList,
    removeMovieFromList
};