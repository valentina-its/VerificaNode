const tvService = require('../services/tvSeries');

/**
 * TV Series Controller
 * Handles HTTP requests for TV shows from TMDB API
 */

// GET /api/tv/popular?page=1
async function getPopularTV(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.fetchPopularTV(page);
        return res.json(data);
    } catch (error) {
        console.error('Error in getPopularTV:', error);
        return res.status(502).json({ message: 'Failed to fetch popular TV shows' });
    }
}

// GET /api/tv/trending?page=1
async function getTrendingTV(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.fetchTrendingTV(page);
        return res.json(data);
    } catch (error) {
        console.error('Error in getTrendingTV:', error);
        return res.status(502).json({ message: 'Failed to fetch trending TV shows' });
    }
}

// GET /api/tv/on-the-air?page=1
async function getOnTheAirTV(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.fetchOnTheAirTV(page);
        return res.json(data);
    } catch (error) {
        console.error('Error in getOnTheAirTV:', error);
        return res.status(502).json({ message: 'Failed to fetch on-the-air TV shows' });
    }
}

// GET /api/tv/top-rated?page=1
async function getTopRatedTV(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.fetchTopRatedTV(page);
        return res.json(data);
    } catch (error) {
        console.error('Error in getTopRatedTV:', error);
        return res.status(502).json({ message: 'Failed to fetch top-rated TV shows' });
    }
}

// GET /api/tv/airing-today?page=1
async function getAiringTodayTV(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.fetchAiringTodayTV(page);
        return res.json(data);
    } catch (error) {
        console.error('Error in getAiringTodayTV:', error);
        return res.status(502).json({ message: 'Failed to fetch TV shows airing today' });
    }
}

// GET /api/tv/:tvId
async function getTVDetails(req, res) {
    const tvId = parseInt(req.params.tvId, 10);

    if (!Number.isFinite(tvId) || tvId <= 0) {
        return res.status(400).json({ message: 'Invalid TV show ID' });
    }

    try {
        const data = await tvService.fetchTVDetails(tvId);
        return res.json(data);
    } catch (error) {
        console.error('Error in getTVDetails:', error);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'TV show not found' });
        }
        return res.status(502).json({ message: 'Failed to fetch TV show details' });
    }
}

// GET /api/tv/search?query=breaking+bad&page=1
async function searchTV(req, res) {
    const query = req.query.query;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await tvService.searchTV(query, page);
        return res.json(data);
    } catch (error) {
        console.error('Error in searchTV:', error);
        return res.status(502).json({ message: 'Failed to search TV shows' });
    }
}

exports.getPopularTV = getPopularTV;
exports.getTrendingTV = getTrendingTV;
exports.getOnTheAirTV = getOnTheAirTV;
exports.getTopRatedTV = getTopRatedTV;
exports.getAiringTodayTV = getAiringTodayTV;
exports.getTVDetails = getTVDetails;
exports.searchTV = searchTV;
