const express = require('express');
const authRoutes = require('./auth');
const tmdbRoutes = require('./tmdb');
const auth = require('../middleware/auth');
const tmdbAxiosRoutes = require('./tmdbAxios');
const favoritesRoutes = require('./favorites');
const tvRoutes = require('./tvSeries');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tmdb', auth, tmdbRoutes);
router.use('/tmdb-axios', auth, tmdbAxiosRoutes);
router.use('/favorites', auth, favoritesRoutes);
router.use('/tv', tvRoutes);

module.exports = router;