const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Boom = require('boom');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { JWT_KEY } = require('../env');
var jwt = require('jsonwebtoken');
const signJWT = promisify(jwt.sign);

const tokenController = require('../controllers/TokenController');

router.post('/token', tokenController.create);

// All non-happy paths:
module.exports = router;
