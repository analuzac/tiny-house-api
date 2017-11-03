const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');

const favoritesController = require('../controllers/FavoritesController');

router.get('/users/:userId(\\d+)/favorites', favoritesController.getAll);
router.post('/users/:userId(\\d+)/favorites', favoritesController.create);
router.delete('/favorites/:favoriteId(\\d+)', favoritesController.delete);

module.exports = router;
