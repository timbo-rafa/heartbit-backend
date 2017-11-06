const restify = require('restify')
const Router = require('restify-router').Router
const router = new Router()

const Patients = require('./patient-model')

console.log('GET /patients list patients')
router.get('/', function (req, res, next) {
  var debug = 'Hello from patient-controller.js!'
  console.log(debug)
  res.send(debug)
})

module.exports = router
