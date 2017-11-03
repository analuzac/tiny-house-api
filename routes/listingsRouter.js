const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const listingsController = require('../controllers/ListingsController');

router.get('/listings', listingsController.getAll);
router.get('/listings/:listingId(\\d+)', listingsController.getOne);
router.post('/listings', listingsController.create);
router.patch('/listings/:listingId(\\d+)', listingsController.patch);
router.delete('/listings/:listingId(\\d+)', listingsController.delete);

module.exports = router;
