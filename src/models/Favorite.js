const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        tmdbId: { type: Number, required: true },
        title: { type: String, required: true },
        overview: { type: String },
        posterPath: { type: String },
        releaseDate: { type: String },
        voteAverage: { type: Number },
        createdAt: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

favoriteSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);