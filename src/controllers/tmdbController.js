const { fetchPopularMovie, fetchTrending, searchMulti } = require('../services/tmdbService');

async function trending(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const data = await getTrending(page);
        return res.json(data);
    } catch (err) {
        try {
            const data = await fetchTrending(page);
            return res.json(data);
        } catch (_) {
            return res.status(502).json({ message: 'Errore nel servizio TMDB' });
        }
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
    const { query } = req.query;
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    if (!query) {
        return res.status(400).json({ message: 'Parametro di ricerca (query) mancante.' });
    }

    try {
        const data = await searchMulti(query, page);
        return res.json(data);
    } catch (error) {
        console.error('Error during multi-search:', error.message);
        return res.status(500).json({ error: 'Internal server error during multi-search' });
    }
}

async function combinedContent(req, res) {
    let page = parseInt(req.query.page, 10);
    if (!Number.isFinite(page)) page = 1;
    if (page < 1) page = 1;
    if (page > 1000) page = 1000;

    try {
        const trendingData = await fetchTrending(page);
        const popularData = await fetchPopularMovie();

        const combinedResults = {
            trending: trendingData.results,
            popular: popularData.results,
            page: page,
            total_pages: Math.max(trendingData.total_pages, popularData.total_pages),
            total_results: trendingData.total_results + popularData.total_results
        };

        return res.json(combinedResults);
    } catch (error) {
        console.error('Error during combined content fetch:', error.message);
        return res.status(500).json({ error: 'Internal server error during combined content fetch' });
    }
}

module.exports = { trending, popular, multiSearch, combinedContent };