const should = require('should')
const supertest = require('supertest')
const app = require('../index')
const Patient = require('../patients/patient-model')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
      request.end(done)
    })

    it('should create with valid parameters', function (done) {
      var request = supertest(app)
      request = request.post('/patients')
      request.send({ 'name': 'Supertest' })
      request.send({ 'age': '1'})
      request.send({ 'doctor': 'SuperDoctor'})
      request.send({ 'insurance': 'SuperInsurance'})
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
          validatePatient(patient)
        })
      })
      request.end(done)
    })
  })

  describe('details', function (done) {

    var superPatient;
    before(function (done) {
      Patient.find( function getPatient(err, patients) {
        //console.log('AAAAAAA', err, patients)
        superPatient = patients[0];
        done()
      })
    })

    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.get('/patients/undefined')
      request.expect(404)
      request.end(done)
    })

    it('should show details with valid id', function (done) {
      var request = supertest(app)
      request = request.get('/patients/' + superPatient.id)
      request.expect(200)
      request.expect(function (res) {
        validatePatient(res.body)
      })
      request.end(done)
    })
  })

  describe('delete', function (done) {
    
    var superPatient;
    before(function (done) {
      Patient.find( function getPatient(err, patients) {
        //console.log('AAAAAAA', err, patients)
        superPatient = patients[0];
        done()
      })
    })

    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.del('/patients/undefined')
      request.expect(404)
      request.end(done)
    })

    it('should delete with valid id', function (done) {
      var request = supertest(app)
      request = request.del('/patients/' + superPatient.id)
      request.expect(204)
      request.end(done)
    })
  })
})


function validatePatient(patient) {
  patient.should.have.property('name')
  patient.should.have.property('age')
  patient.should.have.property('doctor')
  patient.should.have.property('insurance')
}
