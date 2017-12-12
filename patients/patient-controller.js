const router = require('express').Router()

const Patients = require('./patient-model')

console.log('patient-controller')
router
  .route('/')
  .get(function (req, res, next) {
    'use strict'

    // treat ?query= (?)
    Patients.find({}, function (err, patients) {
      console.log('find', err, patients)
      if (err) {
        console.log('mongo error', err)
        return next(err)
      }
      return res.status(200).send(patients)
    })
    console.log('pc / get')
})

//router.post('/', function (req, res, next) {

//})

module.exports = router
