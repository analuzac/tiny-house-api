'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

describe(
  'token routes',
  addDatabaseHooks(() => {
    it('POST /token', done => {
      request(server)
        .post('/token')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          email: 'backyardhost@gmail.com',
          password: 'youreawizard'
        })
        .expect(200)
        .expect(res => {
          res.body.id = 1;
          res.body.name = 'Backyard Host';
          res.body.email = 'backyardhost@gmail.com';
          res.body.token;
        })
        .expect('Content-Type', /json/)
        .end(done);
    });
  })
);
