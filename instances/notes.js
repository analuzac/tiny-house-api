const express = require('express');
const router = express.Router();
const knex = require('../knex');

//router.get('/listings', function(req, res, next) {
//  knex('Listing').select('*').then(result => console.log(result));
// .catch(err => {
//   next(err);
// });
//});

function examp() {
  knex('Listing').select('*').then(result => console.log(result));
  //return Promise.resolve(result);
}

examp();

//One plan of action
//router.post('/listings', userController.create); //this is example of skeleton
// in repository
class userRepository {
  create() {
    res.send(200);
  }
}
// or

router
  .post('/listings', (req, res, next) => {
    res.send(200);
  })
  .catch(err => next(err));
