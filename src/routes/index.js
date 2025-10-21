const express = require('express');
const authRoutes = require('./auth');
const tmdbRoutes = require('./tmdb');
const auth = require('../middleware/auth');
const tmdbAxiosRoutes = require('./tmdbAxios');
const favoritesRoutes = require('./favorites');
const AllYourListsRoutes = require('./AllYourLists');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tmdb', auth, tmdbRoutes);
router.use('/tmdb-axios', auth, tmdbAxiosRoutes);
router.use('/favorites', auth, favoritesRoutes);
router.use('/AllYourLists', auth, AllYourListsRoutes);

module.exports = router;