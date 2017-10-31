const express = require('express');
const Boom = require('boom');
const router = express.Router();

// const userController = require('./userController');
//
// router.post('/users', userController.create);

// Happy path:
router
  .post('/users', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));

// All non-happy paths:
