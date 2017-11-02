'use strict';

process.env.NODE_ENV = 'test';

// const assert = require('chai').assert;
// const bcrypt = require('bcrypt');
// const knex = require('../knex');

const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

describe(
  'users routes',
  addDatabaseHooks(() => {
    it('POST /users', done => {
      const password = 'ilikebigcats';

      request(server)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Aloha Sunset',
          email: 'aloha.sunset@gmail.com',
          password
        })
        .expect(res => {
          delete res.body.timeCreated;
          delete res.body.timeModified;
        })
        .expect(200, {
          id: 3,
          name: 'Aloha Sunset',
          email: 'aloha.sunset@gmail.com'
        })
        .end(done);
    });
  })
);
