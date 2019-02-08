'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex.js')

//List (get all of the resource)
router.get('/', function(req, res, next){
  knex('reservations')
    .select('*')
  .then((data) => {
    res.status(200).json(data)
  })
})

//Read (get one of the resource)
// Get One
// router.get('/:id', function(req, res, next){
//   knex('reservations')
//     .select('*')
//     .where('userId', req.params.id)
//   .then((data) => {
//     res.status(200).json(data[0])
//   })
// })

//Create (create one of the resource)
router.post('/', function(req, res, next){
  knex('reservations')
    .insert(req.body)
    .returning('*')
  .then((data) => {
    res.status(200).json(data[0])
  })

})

router.post('/users/:id', function(req, res, next){
  knex('users_reservations')
    .insert({reservationId:req.body.reservationId, userId:req.params.id})
    .returning('*')
  .then((data) => {
    res.status(200).json(data[0])
  })
})

router.get('/users', function(req, res, next){
  knex('users_reservations')
  .select('*')
  .then((data) => {
    res.status(200).json(data)
  })
})

router.get('/users/:id', function(req, res, next){
  knex('users_reservations')
  .join('reservations', 'users_reservations.reservationId', 'reservations.id')
  .join('pickup_parties', 'reservations.pickupPartiesId', 'pickup_parties.id')
  .join('events', 'pickup_parties.eventId', 'events.id')
  .join('pickup_locations', 'pickup_parties.pickupLocationId' , 'pickup_locations.id')
  .where('users_reservations.userId',req.params.id)
  .then((data) => {
    res.status(200).json(data)
  })
})


router.patch('/:id', function(req, res, next){
  knex('reservations')
    .where('id', req.params.id)
    .update(req.body)
    .returning(['id', 'orderId', 'pickupPartiesId', 'willCallFirstName', 'willCallLastName', 'status', 'discountCodeId'])
  .then((data) => {
    res.status(200).json(data[0])
  })
})

//Delete (delete one of the resource)
router.delete('/:id', function(req, res, next){
  knex('reservations')
    .where('id', req.params.id)
    .del('*')
    .returning(['id', 'orderId', 'pickupPartiesId', 'willCallFirstName', 'willCallLastName', 'status', 'discountCodeId'])
  .then((data) => {
    res.status(200).json(data[0])
  })
})

module.exports = router;
