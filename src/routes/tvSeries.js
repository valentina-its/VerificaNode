const express = require('express');
const tvController = require('../controllers/TvSeriesController');



const router = express.Router();

// Wrapper per gestire errori async
const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

/**
 * Routes per le Serie TV
 * Base path: /api/tv
 * Tutte le routes richiedono autenticazione (middleware auth applicato in index.js)
 */

// GET /api/tv/popular?page=1
// Ritorna le serie TV più popolari
router.get('/popular', wrap(tvController.getPopularTV));

// GET /api/tv/trending?page=1
// Ritorna le serie TV trending della settimana
router.get('/trending', wrap(tvController.getTrendingTV));

// GET /api/tv/on-the-air?page=1
// Ritorna le serie TV con nuovi episodi in questo periodo
router.get('/on-the-air', wrap(tvController.getOnTheAirTV));

// GET /api/tv/top-rated?page=1
// Ritorna le serie TV con i voti più alti
router.get('/top-rated', wrap(tvController.getTopRatedTV));

// GET /api/tv/airing-today?page=1
// Ritorna le serie TV con episodi in onda oggi
router.get('/airing-today', wrap(tvController.getAiringTodayTV));

// GET /api/tv/search?query=breaking+bad&page=1
// Cerca serie TV per nome
router.get('/search', wrap(tvController.searchTV));

// GET /api/tv/:tvId
// Ritorna i dettagli di una serie TV specifica
router.get('/:tvId', wrap(tvController.getTVDetails));

module.exports = router;

/* Endpoint

    GET /api/tv/popular          - Serie TV popolari
    GET /api/tv/trending         - Serie TV trending settimana
    GET /api/tv/on-the-air       - Serie con nuovi episodi
    GET /api/tv/top-rated        - Serie meglio valutate
    GET /api/tv/airing-today     - Serie in onda oggi
    GET /api/tv/search?query=... - Cerca serie TV
    GET /api/tv/:tvId            - Dettagli serie specifica
*/