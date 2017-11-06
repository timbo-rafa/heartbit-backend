const PORT = 8000
const HOST = '127.0.0.1'
const restify = require('restify')
const morganLogger = require('morgan')

const server = restify.createServer( { name: 'heartbit' } )

server
  .use(morganLogger('dev'))
  //Allow the use of POST
  //.use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  //.use(restify.bodyParser())

const patientRouter = require('./patients/patient-controller')
const recordRouter  = require('./records/record-controller')

patientRouter.applyRoutes(server, '/patients')
recordRouter.applyRoutes(server, '/patients/:id/records')

// server ping (last route)
server.get('/', function pingSuccess (req, res, next) {
  'use strict'

  res.send(200)
})

server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

module.exports = server
