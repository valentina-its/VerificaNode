const { tmdbApiKey, tmdbApiUrl } = require('../config');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function getTrending(page = 1) {
    if (!Number.isFinite(page) || page < 1) page = 1;
    if (page > 1000) page = 1000;
    const url = `${tmdbApiUrl}/trending/movie/week?api_key=${tmdbApiKey}&page=${page}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const resp = await fetch(url, { signal: controller.signal });
        if (!resp.ok) {
            const ct = resp.headers.get('content-type') || '';
            let payload = null;
            try {
                payload = ct.includes('application/json') ? await resp.json() : await resp.text();
            } catch (_) { }
            const err = new Error('TMDB request failed');
            err.status = resp.status;
            err.payload = payload;
            throw err;
        }
        return resp.json();
    } catch (err) {
        if (err.name === 'AbortError') {
            const e = new Error('TMDB timeout');
            e.status = 504;
            throw e;
        }
        throw err;
    } finally {
        clearTimeout(timeout);
    }
}

module.exports = { getTrending };