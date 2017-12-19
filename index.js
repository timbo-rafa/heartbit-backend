const HOST = '127.0.0.1'
const express = require('express')
const app = express()
const morganLogger = require('morgan')
const mongoose = require('mongoose')
const nconf = require('./nconf')
const bodyParser = require('body-parser')

mongoose.connect(nconf.get('MONGOHQ_URL'))

app
  .use(morganLogger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({'extended': true}))

const patientRouter = require('./patients/patient-controller')
//const recordRouter  = require('./records/record-controller')

app.use('/patients', patientRouter)
//app.use('/patients/:patient/records', recordRouter)

// server ping (last route)
app.get('/', function pingSuccess (req, res, next) {
  'use strict'

  console.log('Server ping on /')
  res.sendStatus(200)
  //res.status(200).send({})
})

app.use(function handleErrors (error, request, response, next) {
  'use strict'

    if(error) {
      //TODO error 409
      if (error.name === "ValidationError") {
        return response.status(400).send(error.message)
      }
      else if (error.name === "MongooseError") {
        return response.status(400).send(error.message)
      }
      console.log('server error:', error)
      return response.status(400).send(error)
    }
  console.error(error)
  console.error(error.stack)
  response.status(500).end()
})

app.listen(nconf.get('PORT'), function () {
  console.log('Server listening at %s', nconf.get('PORT'))
})
module.exports = app
