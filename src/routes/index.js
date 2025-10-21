const express = require('express');
const authRoutes = require('./auth');
const auth = require('../middleware/auth');
const tmdbRoutes = require('./tmdb');
const favoritesRoutes = require('./favorites');
const AllYourListsRoutes = require('./AllYourLists');

const tvRoutes = require('./tvSeries');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/all', auth, tmdbRoutes);
router.use('/favorites', auth, favoritesRoutes);
router.use('/AllYourLists', auth, AllYourListsRoutes);
router.use('/tv', tvRoutes);

module.exports = router;