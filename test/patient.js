const should = require('should')
const supertest = require('supertest')
const app = require('../index')
const Patient = require('../patients/patient-model')


describe('patient controller', function () {
  'use strict'

  before(function (done) {
    Patient.remove(function (err, removed) {
      done()
    })
  })

  describe('create', function (done) {

    it('should raise error without required fields', function (done) {
      var request = supertest(app)
      request = request.post('/patients')
      request.send({})
      request.expect(400)
      //request.expect({ 'name': 'required' })
      request.end(done)
    })

    it('should create with valid parameters', function (done) {
      var request = supertest(app)
      request = request.post('/patients')
      request.send({ 'name': 'John' })
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
        res.body.forEach( function ( patient ) {
          patient.should.have.property('name')
        })
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
      request = request.get('/patients/John')
      request.expect(200)
      request.expect(function (res) {
        res.body.should.have.property('name')
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
      request = request.del('/patients/John')
      request.expect(204)
      request.end(done)
    })
  })
})
