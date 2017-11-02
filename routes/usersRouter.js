const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { JWT_KEY } = require('../env');
var jwt = require('jsonwebtoken');
const signJWT = promisify(jwt.sign);

// const userController = require('./userController');
//
// router.post('/users', userController.create);

// Happy path:
router.post('/users', function(req, res, next) {
  bcrypt
    .hash(req.body.password, 12)
    .then(hashedPassword => {
      return knex('User').insert(
        {
          name: req.body.name,
          email: req.body.email,
          hashedPassword: hashedPassword
        },
        '*'
      );
    })
    .then(users => {
      let user = users[0];
      delete user.hashedPassword;
      delete user.timeCreated;
      delete user.timeModified;
      user = Object.assign({}, user);

      return res.send(user);
    })
    .catch(err => next(err));
});
// All non-happy paths:

module.exports = router;
