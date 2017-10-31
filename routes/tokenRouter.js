const express = require('express');
const Boom = require('boom');
const router = express.Router();

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
