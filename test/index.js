require('should')
var supertest = require('supertest')
var app       = require('../index.js')

it('should raise server', function (done) {
  'use strict'

  var request = supertest(app)
  request = request.get('/')
  request.expect(200)
  request.end(done)
})
