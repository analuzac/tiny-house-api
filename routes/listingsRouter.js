const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
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
  // Decoding token passed in via client
  let storedToken = req.headers.authorization;
  let decodedToken = jwt.decode(storedToken);
  console.log('LE TOKEN', decodedToken);
  let leUserId = decodedToken.sub;
  console.log('LE USER', leUserId);
  //
  // Need to be a registered user to see listing details:
  if (!storedToken) {
    res.status(401).send('Unauthorized - you need to be a registered user');
    return;
  }
  //
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(listing => {
      console.log('LE LISTING OWNER', listing.userId);
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

// Create a listing:
router.post('/listings', function(req, res, next) {
  ///users/:userId(\\d+)/listings
  //
  // Decoding token passed in via client
  let storedToken = req.headers.authorization;
  let decodedToken = jwt.decode(storedToken);
  console.log('LE TOKEN', decodedToken);
  let leUserId = decodedToken.sub;
  console.log('LE USER', leUserId);
  //
  // Need to be a registered user to make a listing:
  if (!storedToken) {
    res.status(401).send('Unauthorized - you need to be a registered user');
    return;
  }
  //

  knex('Listing')
    .insert(
      {
        // userId: req.params.userId,
        userId: leUserId,
        location: req.body.location,
        dimensions: req.body.dimensions,
        rent: req.body.rent,
        date: req.body.date,
        amenities: req.body.amenities
      },
      '*'
    )
    .then(listing => {
      console.log('LE LISTING OWNER', listing.userId);
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
  // Decoding token passed in via client
  let storedToken = req.headers.authorization;
  let decodedToken = jwt.decode(storedToken);
  console.log('LE TOKEN', decodedToken);
  let leUserId = decodedToken.sub;
  console.log('LE USER', leUserId);
  //
  // First you need to be a registered user to make it this far:
  if (!storedToken) {
    res.status(401).send('Unauthorized - you need to be a registered user');
    return;
  }
  //
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(listing => {
      //to check edit authorization:
      console.log('LE LISTING OWNER', listing.userId);
      if (listing.userId !== leUserId) {
        //throw new Error('Forbidden')
        res.status(403).send('Forbidden - you do not own this listing');
        return;
      }
      //
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
  // Decoding token passed in via client
  let storedToken = req.headers.authorization;
  let decodedToken = jwt.decode(storedToken);
  console.log('LE TOKEN', decodedToken);
  let leUserId = decodedToken.sub;
  console.log('LE USER', leUserId);
  //
  // First you need to be a registeredF user to make it this far:
  if (!storedToken) {
    res.status(401).send('Unauthorized - you need to be a registered user');
    return;
  }
  //
  let output;
  knex('Listing')
    .where('id', req.params.listingId)
    .first()
    .then(row => {
      //to check delete authorization:
      console.log('LE LISTING OWNER', row.userId);
      if (row.userId !== leUserId) {
        //throw new Error('Forbidden')
        res.status(403).send('Forbidden - you do not own this listing');
        return;
        //
      } else {
        output = row;
        return knex('Listing').del().where('id', req.params.listingId);
      }
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
