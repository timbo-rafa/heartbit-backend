const router = require('express').Router()

const Records = require('./record-model')

console.log('GET /patients/:id/records list patient\'s records')
router.get('/', function (req, res, next) {
  var debug = 'Hello from record-controller.js!'
  console.log(debug)
  res.send(debug)
})

module.exports = router
