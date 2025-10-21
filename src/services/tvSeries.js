const axios = require('axios');
const { tmdbApiKey, tmdbApiUrl } = require('../config');

/**
 * Service dedicato alle Serie TV (TMDB API)
 * Separato dal codice dei film per non interferire
 */

// Serie TV popolari
const fetchPopularTV = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    try {
        const response = await axios.get(`${tmdbApiUrl}/tv/popular`, {
            params: { 
                api_key: tmdbApiKey, 
                page: safePage,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular TV shows:', error.message);
        throw error;
    }
};

// Serie TV trending della settimana
const fetchTrendingTV = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    try {
        const response = await axios.get(`${tmdbApiUrl}/trending/tv/week`, {
            params: { 
                api_key: tmdbApiKey, 
                page: safePage,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending TV shows:', error.message);
        throw error;
    }
};

// Serie TV in onda ora (nuovi episodi)
const fetchOnTheAirTV = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    try {
        const response = await axios.get(`${tmdbApiUrl}/tv/on_the_air`, {
            params: { 
                api_key: tmdbApiKey, 
                page: safePage,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching on the air TV shows:', error.message);
        throw error;
    }
};

// Serie TV top rated (meglio valutate)
const fetchTopRatedTV = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
      console.log('Calling TMDB top rated with page:', safePage);
    try {
        const response = await axios.get(`${tmdbApiUrl}/tv/top_rated`, {
            params: { 
                api_key: tmdbApiKey, 
                page: safePage,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top rated TV shows:', error.message);
        throw error;
    }
};

// Serie TV in onda oggi
const fetchAiringTodayTV = async (page = 1) => {
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    try {
        const response = await axios.get(`${tmdbApiUrl}/tv/airing_today`, {
            params: { 
                api_key: tmdbApiKey, 
                page: safePage,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching airing today TV shows:', error.message);
        throw error;
    }
};

// Dettagli di una serie TV specifica
const fetchTVDetails = async (tvId) => {
    if (!Number.isFinite(tvId) || tvId <= 0) {
        throw new Error('Invalid TV ID');
    }
    try {
        const response = await axios.get(`${tmdbApiUrl}/tv/${tvId}`, {
            params: { 
                api_key: tmdbApiKey,
                language: 'it-IT'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching TV details for ID ${tvId}:`, error.message);
        throw error;
    }
};

// Cerca serie TV per nome
const searchTV = async (query, page = 1) => {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
        throw new Error('Search query is required');
    }
    const safePage = !Number.isFinite(page) || page < 1 ? 1 : Math.min(page, 1000);
    try {
        const response = await axios.get(`${tmdbApiUrl}/search/tv`, {
            params: { 
                api_key: tmdbApiKey, 
                query: query.trim(),
                page: safePage,
                language: 'en-us'
            },
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error('Error searching TV shows:', error.message);
        throw error;
    }
};

// Helper per costruire URL immagini TMDB
const getImageUrl = (path, size = 'w185') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

module.exports = {
    fetchPopularTV,
    fetchTrendingTV,
    fetchOnTheAirTV,
    fetchTopRatedTV,
    fetchAiringTodayTV,
    fetchTVDetails,
    searchTV,
    getImageUrl
};