const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../env');
var jwt = require('jsonwebtoken');
const signJWT = promisify(jwt.sign);

// const userController = require('./userController');
//
// router.post('/users', userController.create);

// Happy path:
router
  .post('/users', function(req, res, next) {
    const scope = {};
    bcrypt.hash(req.body.password, 12).then(hashedPassword => {
      return knex('User').insert(
        {
          name: req.body.name,
          email: req.body.email,
          hashedPassword: hashedPassword
        },
        '*'
      );
    });
  })
  .then(users => {
    const user = users[0];
    delete user.hashed_password;
    scope.user = user;
    return user;
  })
  .then(user => {
    return signJWT({ sub: user.id }, JWT_KEY);
  })
  .then(token => {
    res.cookie('token', token, { httpOnly: true }).json(scope.user);
  })
  .catch(err => next(err));

// All non-happy paths:
