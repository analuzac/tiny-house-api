const express = require('express');
const Boom = require('boom');
const router = express.Router();

// const listingsController = require('./listingsController');
//
// router.get('/listings', listingsController.getAll);
// router.post('/listings', listingsController.create);
//

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
