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

router.post('/users', function(req, res, next) {
  //Check for duplicate email:
  knex('User')
    .where({ email: req.body.email })
    .then(result => {
      if (result.length > 0) {
        throw new Error('HTTP_400');
      }
      return true;
    })
    .then(() => {
      return bcrypt.hash(req.body.password, 12);
    })
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
    .catch(err => {
      if (err.message === 'HTTP_400') {
        res.set('Content-Type', 'text/plain');
        res.status(400).send('Duplicate email');
        return;
      }
      //console.log('THE_ERR', err);
      next(err);
    });
});

module.exports = router;
