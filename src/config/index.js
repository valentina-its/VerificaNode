require('dotenv').config();

function toInt(val, def) {
    const n = parseInt(val, 10);
    return Number.isFinite(n) ? n : def;
}

const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: toInt(process.env.PORT, 3000),
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbApiUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3',
    jsonLimit: process.env.JSON_LIMIT || '10kb',
    rateLimitWindowMs: toInt(process.env.RATELIMIT_WINDOW_MS, 15 * 60 * 1000),
    rateLimitMax: toInt(process.env.RATELIMIT_MAX, 10),
};

module.exports = config;