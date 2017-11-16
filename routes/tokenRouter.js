const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { JWT_KEY } = require('../env');
var jwt = require('jsonwebtoken');
const signJWT = promisify(jwt.sign);

// const tokenController = require('./tokenController');
//
// router.post('/token', tokenController.create);

// Happy path:
router.post('/token', function(req, res, next) {
  const scope = {};
  const email = req.body.email;
  const password = req.body.password;

  return knex('User')
    .orderBy('email')
    .where({ email: req.body.email })
    .then(([user]) => {
      if (!user) {
        //throw new Error('invalid credentials');
        res.set('Content-Type', 'text/plain');
        return res.status(400).send('Bad email or password');
        //res.set;
      }
      scope.user = user;
      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(result => {
      if (result !== true) {
        //throw new Error('invalid credentials');
        res.set('Content-Type', 'text/plain');
        return res.status(400).send('Bad email or password');
      }
      return signJWT({ sub: scope.user.id }, JWT_KEY);
    })
    .then(token => {
      delete scope.user.hashedPassword;
      delete scope.user.timeCreated;
      delete scope.user.timeModified;
      scope.user.token = token;

      res.send(scope.user);
    })
    .catch(err => {
      next(err);
    });
});

// All non-happy paths:
module.exports = router;
