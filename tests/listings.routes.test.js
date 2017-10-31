'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');

const request = require('supertest');
// const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
const server = require('../server');

describe(
  'listings routes',
  addDatabaseHooks(() => {
    //
    // GET ALL
    //
    it('GET /listings', done => {
      request(server)
        .get('/listings')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(
          200,
          [
            {
              id: 1,
              userId: 2,
              location: 'Berkeley, CA',
              dimensions: 300,
              rent: 500,
              date: 'November 10, 2017',
              amenities: 'water hose, washer & dryer, backyard puppie'
            },
            {
              id: 2,
              userId: 1,
              location: 'Oakland, CA',
              dimensions: 200,
              rent: 400,
              date: 'December 1, 2017',
              amenities: 'next to Lake Merrit'
            }
          ],
          done
        );
    });

    //
    // GET ONE
    //
    it('GET /listings/:listingId(\\d+)', done => {
      request(server)
        .get('/listings/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(
          200,
          {
            id: 1,
            userId: 2,
            location: 'Berkeley, CA',
            dimensions: 300,
            rent: 500,
            date: 'November 10, 2017',
            amenities: 'water hose, washer & dryer, backyard puppie'
          },
          done
        );
    });

    //
    // POST
    //
    it('POST /users/:userId(\\d+)/listings', done => {
      request(server)
        .post('/users/1/listings')
        .set('Accept', 'application/json')
        .send({
          userId: 1,
          location: 'Albany, CA',
          dimensions: 400,
          rent: 600,
          date: 'Jan 1, 2018',
          amenities: 'next to grocery store'
        })
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(
          200,
          {
            id: 3,
            userId: 1,
            location: 'Albany, CA',
            dimensions: 400,
            rent: 600,
            date: 'Jan 1, 2018',
            amenities: 'next to grocery store'
          },
          done
        );
    });

    //
    // PATCH
    //
    it('PATCH /listings/:listingId(\\d+)', done => {
      request(server)
        .patch('/listings/1')
        .set('Accept', 'application/json')
        .send({
          amenities: 'next to public transit'
        })
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(
          200,
          {
            id: 1,
            userId: 2,
            location: 'Berkeley, CA',
            dimensions: 300,
            rent: 500,
            date: 'November 10, 2017',
            amenities: 'next to public transit'
          },
          done
        );
    });

    //
    // DELETE
    //
    it('DELETE /listings/:listingId(\\d+)', done => {
      request(server)
        .del('/listings/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(
          200,
          {
            userId: 2,
            location: 'Berkeley, CA',
            dimensions: 300,
            rent: 500,
            date: 'November 10, 2017',
            amenities: 'water hose, washer & dryer, backyard puppie'
          },
          done
        );
    });
  })
);
