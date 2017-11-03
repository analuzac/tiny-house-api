'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

describe(
  'part5 routes favorites',
  addDatabaseHooks(() => {
    //
    // WITH TOKEN
    //
    describe('with token', () => {
      const agent = request.agent(server);
      let cookie = null;

      beforeEach(done => {
        request(server)
          .post('/token')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send({
            email: 'jkrowling@gmail.com',
            password: 'youreawizard'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            cookie = res.headers['set-cookie'];
            done();
          });
      });

      it('GET /favorites', done => {
        agent
          .get('/favorites')
          .set('Accept', 'application/json')
          .set('Cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(
            200,
            [
              {
                id: 1,
                bookId: 1,
                userId: 1,
                createdAt: '2016-06-29T14:26:16.000Z',
                updatedAt: '2016-06-29T14:26:16.000Z',
                title: 'JavaScript, The Good Parts',
                author: 'Douglas Crockford',
                genre: 'JavaScript',
                description:
                  "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
                coverUrl:
                  'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg'
              }
            ],
            done
          );
      });

      it('POST /favorites', done => {
        agent
          .post('/favorites')
          .set('Accept', 'application/json')
          .set('Cookie', cookie)
          .set('Content-Type', 'application/json')
          .send({ bookId: 2 })
          .expect('Content-Type', /json/)
          .expect(res => {
            delete res.body.createdAt;
            delete res.body.updatedAt;
          })
          .expect(200, { id: 2, bookId: 2, userId: 1 }, done);
      });

      it('DELETE /favorites', done => {
        agent
          .delete('/favorites')
          .set('Accept', 'application/json')
          .set('Cookie', cookie)
          .set('Content-Type', 'application/json')
          .send({ bookId: 1 })
          .expect('Content-Type', /json/)
          .expect(res => {
            delete res.body.createdAt;
            delete res.body.updatedAt;
          })
          .expect(200, { bookId: 1, userId: 1 }, done);
      });
    });
  })
);
