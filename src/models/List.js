const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true },
        description: { type: String },
        movies: [
            {
                tmdbId: { type: Number, required: true },
                title: { type: String, required: true },
                overview: { type: String },
                posterPath: { type: String },
                releaseDate: { type: String },
                voteAverage: { type: Number }
            }
        ],
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

module.exports = mongoose.model('List', listSchema);