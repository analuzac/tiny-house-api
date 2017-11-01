const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');

// const tokenController = require('./tokenController');
//
// router.post('/token', tokenController.create);

// Happy path:
router
  .post('/token', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));

// All non-happy paths:
