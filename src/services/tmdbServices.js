const axios = require('axios');
const { tmdbApiKey, tmdbApiUrl } = require('../config');

const fetchPopularMovie = async () => {
    try {
        const response = await axios.get(`${tmdbApiUrl}/movie/popular?api_key=${tmdbApiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        if (error.response) {
            console.error('TMDB API Error Response (Popular Movies):', error.response.data);
        }
        throw error;
    }
};

const fetchTrending = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/trending/movie/week`;
    try {
        const response = await axios.get(url, {
            params: { api_key: tmdbApiKey, page: safePage },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error.message);
        if (error.response) {
            console.error('TMDB API Error Response (Trending Movies):', error.response.data);
        }
        throw error;
    }
};

const searchTv = async (query, page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/search/tv`;
    const response = await axios.get(url, {
        params: { api_key: tmdbApiKey, query, page: safePage },
        timeout: 10000
    });
    return response.data;
};

const searchMulti = async (query, page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    const url = `${tmdbApiUrl}/search/multi`;
    const response = await axios.get(url, {
        params: {
            api_key: tmdbApiKey,
            query: query,
            page: safePage
        },
        timeout: 10000
    });
    return response.data;
};

const fetchMovieById = async (tmdbId) => {
    const idNum = parseInt(tmdbId, 10);
    if (!Number.isFinite(idNum) || idNum <= 0) {
        throw new Error('Invalid tmdbId');
    }
    const url = `${tmdbApiUrl}/movie/${idNum}`;
    const response = await axios.get(url, {
        params: { api_key: tmdbApiKey },
        timeout: 10000
    });
    return response.data;
};

module.exports = { fetchPopularMovie, fetchTrending, fetchMovieById, searchTv, searchMulti };
