const { fetchPopularMovie, fetchTrending, searchMulti, fetchCombinedContent } = require('../services/tmdbServices');

async function trending(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await fetchTrending(page);
        return res.json(data);
    } catch (_) {
        return res.status(502).json({ message: 'Error fetching trending data' });
    }
}

async function popular(req, res) {
    try {
        const data = await fetchPopularMovie();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function multiSearch(req, res) {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q || q.length < 2) {
        return res.status(400).json({ message: 'Parameter q is required and must be at least 2 characters long' });
    }

    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page) || page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await searchMulti(q, page);
        return res.json(data);
    } catch (error) {
        console.error('Error during multi-search:', error.message);
        return res.status(502).json({ message: 'Error fetching multi-search data' });
    }
}

async function combinedContent(req, res) {
    try {
        const data = await fetchCombinedContent();
        return res.json(data);
    } catch (error) {
        console.error('Error during combined content fetch:', error.message);
        return res.status(502).json({ message: 'Error fetching combined content data' });
    }
}

module.exports = { trending, popular, multiSearch, combinedContent };