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
router.get('/users/:userId(\\d+)/favorites', (req, res, next) => {
  return knex('Favorite')
    .select(
      'Favorite.id',
      'Favorite.userId',
      'Favorite.listingId',
      'Listing.location',
      'Listing.dimensions',
      'Listing.rent',
      'Listing.date',
      'Listing.amenities'
    )
    .innerJoin('Listing', 'Listing.id', 'Favorite.listingId')
    .then(result => {
      let output = Object.assign({}, result[0]);

      return res.json([output]);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// Create a favorite:
router.post('/users/:userId(\\d+)/favorites', (req, res, next) => {
  console.log('REQ', req.body);
  let cookieToken = req.cookies.token;
  let decodedToken = jwt.decode(cookieToken);
  let leUserId = decodedToken.sub;
  let theVal = Object.values(req.body);
  let leListingId = theVal[0];
  //
  knex('favorites')
    .insert(
      {
        userId: leUserId,
        listingId: leListingId
      },
      '*'
    )
    .then(result => {
      let output = Object.assign({}, result[0]);
      delete output.timeCreated;
      delete output.timeModified;

      return res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// Delete a listing:
router.delete('/favorites/:favoriteId(\\d+)', (req, res, next) => {
  console.log('REQ', req.body);
  let cookieToken = req.cookies.token;
  let decodedToken = jwt.decode(cookieToken);
  let leUserId = decodedToken.sub;
  let theVal = Object.values(req.body);
  let leListingId = theVal[0];
  //
  knex('favorites')
    .del('*')
    .where({
      userId: leUserId,
      listingId: leListingId
    })
    .then(result => {
      let output = Object.assign({}, result[0]);

      if (!output.id) {
        res.set('Content-Type', 'text/plain');
        res.status(404).send('Favorite not found');
        return;
      }
      delete output.id;
      delete output.timeCreated;
      delete output.timeModified;

      return res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

module.exports = router;
