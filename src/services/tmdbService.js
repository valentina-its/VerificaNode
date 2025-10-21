const axios = require('axios');
const { tmdbApiKey, tmdbApiUrl } = require('../config');

const fetchPopularMovie = async () => { // Funzione per ottenere i film popolari da TMDB
    try {
        const response = await axios.get(`${tmdbApiUrl}/movie/popular?api_key=${tmdbApiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        throw error;
    }
};

const fetchTrending = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/trending/movie/week`;
    const response = await axios.get(url, {
        params: { api_key: tmdbApiKey, page: safePage },
        timeout: 10000
    });
    return response.data;
};

<<<<<<<< HEAD:src/services/tmdbServices.js
const searchSeriesTv = async (query, page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/search/tv`;
    const response = await axios.get(url, {
        params: { api_key: tmdbApiKey, query, page: safePage },
========
const searchMulti = async (query, page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/search/multi`;
    const response = await axios.get(url, {
        params: {
            api_key: tmdbApiKey,
            query: query,
            page: safePage
        },
>>>>>>>> 0b11d729ac7b4175131756ae1ecf2a001ffd57fd:src/services/tmdbService.js
        timeout: 10000
    });
    return response.data;
};

<<<<<<<< HEAD:src/services/tmdbServices.js
module.exports = { fetchPopularMovie, fetchTrending, searchSeriesTv };
========
module.exports = { fetchPopularMovie, fetchTrending, searchMulti };
>>>>>>>> 0b11d729ac7b4175131756ae1ecf2a001ffd57fd:src/services/tmdbService.js
