'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex.js')

//join attempt1
router.get('/', function(req,res, next){
  knex('pickup_locations')
  .join('pickup_parties', 'pickup_locations.id', 'pickup_parties.pickupLocationId')
  .select('*')
    .select('*')
    //currently selecting all rows/ figure out which ones to keep later (obviously capacity and locationid :)
  .then((data)=>{
    res.status(200).json(data)
  })
})
//Read (get one of the resource)
// Get One
router.get('/:id', function(req, res, next){
  knex('pickup_locations')
    .select('id', 'streetAddress', 'city', 'locationName', 'latitude', 'longitude', 'type', 'basePrice')
    .where('id', req.params.id)
  .then((data) => {
    res.status(200).json(data[0])
  })
})

//Create (create one of the resource)
router.post('/', function(req, res, next){
  knex('pickup_locations')
    .insert(req.body)
    .returning(['id', 'streetAddress', 'city', 'locationName', 'latitude', 'longitude', 'type', 'basePrice'])
  .then((data) => {
    res.status(200).json(data[0])
  })
})

router.patch('/:id', function(req, res, next){
  knex('pickup_locations')
    .where('id', req.params.id)
    .update(req.body)
    .returning(['id', 'streetAddress', 'city', 'locationName', 'latitude', 'longitude', 'type', 'basePrice'])
  .then((data) => {
    res.status(200).json(data[0])
  })
})

//Delete (delete one of the resource)
router.delete('/:id', function(req, res, next){
  knex('pickup_locations')
    .where('id', req.params.id)
    .del('*')
    .returning(['id', 'streetAddress', 'city', 'locationName', 'latitude', 'longitude', 'type', 'basePrice'])
  .then((data) => {
    res.status(200).json(data[0])
  })
})

module.exports = router;
