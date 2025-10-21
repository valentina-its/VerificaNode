const express = require('express');
const authRoutes = require('./auth');
const auth = require('../middleware/auth');
const tmdbRoutes = require('./tmdb');
const favoritesRoutes = require('./favorites');
const AllYourListsRoutes = require('./AllYourLists');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tmdb', tmdbRoutes);
router.use('/favorites', auth, favoritesRoutes);
router.use('/AllYourLists', auth, AllYourListsRoutes);

module.exports = router;