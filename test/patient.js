const should = require('should')
const supertest = require('supertest')
const app = require('../index')

describe('patient controller', function () {
  'use strict'

  describe('create', function (done) {

    it('should raise error without required fields', function (done) {
      var request = supertest(app)
      request = request.post('/patients')
      request.send({})
      request.expect(400)
      request.expect({ 'parameter': 'required' })
      request.end(done)
    })

    it('should create with valid parameters', function (done) {
      var request = supertest(app)
      request = request.post('/patients')
      request.send({})
      request.expect(201)
      request.end(done)
    })
  })

  describe('list all', function (done) {
    it('should list all patients', function (done) {
      var request = supertest(app)
      request = request.get('/patients')
      request.expect(200)
      request.expect(function (res) {
        res.body.should.equal({})
      })
      request.end(done)
    })
  })

  describe('details', function (done) {
    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.get('/patients/invalid')
      request.expect(404)
      request.end(done)
    })

    it('should show details with valid id', function (done) {
      var request = supertest(app)
      request = request.get('/patients/1')
      request.expect(200)
      request.expect(function (res) {
        res.body.should.equal({})
      })
      request.end(done)
    })
  })

  describe('delete', function (done) {
    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.del('/patients/invalid')
      request.expect(404)
      request.end(done)
    })

    it('should delete with valid id', function (done) {
      var request = supertest(app)
      request = request.del('/patients/1')
      request.expect(204)
      request.end(done)
    })
  })
})
