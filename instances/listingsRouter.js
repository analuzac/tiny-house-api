const express = require('express');

const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
const Boom = require('boom');

router.use(bodyParser.json());

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
  res.sendStatus(200);
  // knex('Listing').select('*').then(result => {
  //   console.log(result);
  //   // res.json(result);
  //   // res.send(200);
  //   //res.status(200).json(result);
  //   console.log(res.send, res.status, res.json);
  //   res.json(result);
  // });
});
//.catch(err => next(err));

// Get one listing:
router.get('/listings/:listingId(\\d+)', function(req, res, next) {
  knex('Listing').where('id', req.params.listingId).first().then(result => {
    console.log(result);
    return;
  });
  //res.send(200);
});
//.catch(err => next(err));

// Create a listing:
router.post('/users/:userId(\\d+)/listings', function(req, res, next) {
  console.log('DO I GET IN HERE');
  console.log('THE REQ BODY', req.body);
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
    .then(result => {
      console.log(result);
      return;
    });
  //res.send(200);
});
//.catch(err => next(err));

// Update a listing:
router.patch('/listings/:listingId(\\d+)', function(req, res, next) {
  console.log('THE REQ BODY', req.body);
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
    .then(result => {
      console.log(result);
      return;
    });
  //res.send(200);
});
//.catch(err => next(err));

// Delete a listing:
router.delete('/listings/:listingId(\\d+)', function(req, res, next) {
  let listing;
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(row => {
      listing = row;
      return knex('Listing').del().where('id', req.params.listingId);
    })
    .then(() => {
      delete listing.id;
      console.log(listing);
      //res.send(200);
    });
});
//.catch(err => next(err));

// All non-happy paths:

module.exports = router;
