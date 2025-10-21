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
                voteAverage: { type: Number },
                rating: { type: Number, min: 1, max: 10 },
                comment: { type: String },
                status: { type: String, enum: ['visto', 'da vedere'], default: 'da vedere' }
            }
        ],
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

module.exports = mongoose.model('List', listSchema);