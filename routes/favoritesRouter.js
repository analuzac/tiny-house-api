const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');

// const listingsController = require('./listingsController');
//
// router.get('/listings', favoritesController.getAll);
// router.post('/listings', favoritesController.create);
// router.delete('/listings', favoritesController.delete);

// Happy paths:

// Get all favorites:
router
  .get('/users/:userId(\\d+)/favorites', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));

// Create a favorite:
router
  .post('/users/:userId(\\d+)/favorites', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));

// Delete a listing:
router
  .delete('/favorites/:favoriteId(\\d+)', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));

module.exports = router;
