const router = require('express').Router()

const Patients = require('./patient-model')

console.log('GET /patients list patients')
router.get('/', function (req, res, next) {
  // treat ?query= (?)
  Patients.find({}, function (err, patients) {
    res.status(200).send(patients)
  })
  console.log('patient-controller GET /')
})

//router.post('/', function (req, res, next) {

//})

module.exports = router
