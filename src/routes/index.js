const express = require('express');
const authRoutes = require('./auth');
const auth = require('../middleware/auth');
const favoritesRoutes = require('./favorites');
const tmdbRoutes = require('./tmdb');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/all', auth, tmdbRoutes);
router.use('/favorites', auth, favoritesRoutes);

module.exports = router;