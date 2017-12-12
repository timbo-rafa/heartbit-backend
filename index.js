const HOST = '127.0.0.1'
const express = require('express')
const app = express()
const morganLogger = require('morgan')
const mongoose = require('mongoose')
const nconf = require('./nconf')

mongoose.connect(nconf.get('MONGOHQ_URL'))

app
  .use(morganLogger('dev'))
  //Allow the use of POST
  //.use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  //.use(restify.bodyParser())

const patientRouter = require('./patients/patient-controller')
const recordRouter  = require('./records/record-controller')

app.use('/patients', patientRouter)
app.use('/patients/:id/records', recordRouter)

// server ping (last route)
app.get('/', function pingSuccess (req, res, next) {
  'use strict'

  console.log('Server ping on /')
  res.sendStatus(200)
  //res.status(200).send({})
})

app.listen(nconf.get('PORT'), HOST, function () {
  console.log('Server listening at %s:%s', HOST, nconf.get('PORT'))
})
module.exports = app
