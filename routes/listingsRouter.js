const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');

//const bodyParser = require('body-parser');
//router.use(bodyParser.json());

// const listingsController = require('./listingsController');
//
// router.get('/listings', listingsController.getAll);
// router.get('/listings/:listingId(\\d+), listingsController.getOne);
// router.post('/users/:userId(\\d+)/listings', listingsController.create);
// router.patch('/listings/:listingId(\\d+)', listingsController.patch);
// router.delete('/listings/:listingId(\\d+)', listingsController.delete);

// Happy paths:

// Get all listings:
router.get('/listings', function(req, res, next) {
  //
  knex('Listing')
    .select('*')
    .then(listings => {
      //console.log(listings);
      let result = listings;
      let output = [];
      result.forEach(item => {
        delete item.timeCreated;
        delete item.timeModified;
        output.push(Object.assign({}, item));
      });

      res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// Get one listing:
router.get('/listings/:listingId(\\d+)', function(req, res, next) {
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(listing => {
      let result = listing;
      let output = Object.assign({}, result);
      delete output.timeCreated;
      delete output.timeModified;

      res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});
//.catch(err => next(err));

// Create a listing:
router.post('/users/:userId(\\d+)/listings', function(req, res, next) {
  //
  console.log('DO I GET IN HERE?');
  console.log('BEFORE KNEX', req);
  knex('Listing')
    .insert(
      {
        userId: req.params.userId,
        location: req.body.location,
        dimensions: req.body.dimensions,
        rent: req.body.rent,
        date: req.body.date,
        amenities: req.body.amenities
      },
      '*'
    )
    .then(listing => {
      let result = listing;
      let output = Object.assign({}, result[0]);
      delete output.timeCreated;
      delete output.timeModified;
      console.log('INSIDE POST BACKEND', output);
      res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// Update a listing:
router.patch('/listings/:listingId(\\d+)', function(req, res, next) {
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(listing => {
      return knex('Listing')
        .update(
          {
            userId: req.params.userId,
            location: req.body.location,
            dimensions: req.body.dimensions,
            rent: req.body.rent,
            date: req.body.date,
            amenities: req.body.amenities
          },
          '*'
        )
        .where('id', req.params.listingId);
    })
    .then(listing => {
      let result = listing;
      let output = Object.assign({}, result[0]);
      delete output.timeCreated;
      delete output.timeModified;
      console.log('INSIDE PATCH BACKEND', output);
      res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// Delete a listing:
router.delete('/listings/:listingId(\\d+)', function(req, res, next) {
  let output;
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(row => {
      output = row;
      return knex('Listing').del().where('id', req.params.listingId);
    })
    .then(() => {
      output = Object.assign({}, output);
      delete output.id;
      delete output.timeCreated;
      delete output.timeModified;

      res.json(output);
    })
    .catch(err => {
      console.log('THE_ERR', err);
      next(err);
    });
});

// All non-happy paths:

module.exports = router;
