const should = require('should')
const supertest = require('supertest')
const app = require('../index')
const Patient = require('../patients/patient-model')
const Record = require('../patients/records/record-model')

describe('record controller', function () {
  'use strict'

  
  before(function (done) {
    Record.remove( function(err, removed) {
      done(err)
    })
  })

  before(function (done) {
    Patient.remove( function(err, removed) {
      done(err)
    })
  })

  var superPatient;
  var recordUrl;
  before(function (done) {
    var newPatient = new Patient({
       'name': 'Supertest',
       'age': '1',
       'doctor': 'SuperDoctor',
       'insurance': 'SuperInsurance'
    })
    newPatient.save( function savePatient(err, savedPatient) {
      superPatient = savedPatient
      console.log('superPatient recordTest',superPatient)
      done(err)
    })
  })

  var superRecord, superRecordJSON
  before( function createNewRecord (done) {
    superRecordJSON = {
      'patient': superPatient.id,
      'lab': 'SuperLab',
      'doctor': 'SuperDoctor',
      'glucose': '88',
      'redBloodCells': '44',
      'whiteBloodCells': '77',
      'platelet': '33',
      'iron': '22'
    }
    var newRecord = new Record(superRecordJSON)

    newRecord.save(function saveSuperRecord(err, savedRecord) {
      superRecord = savedRecord
      done(err)
    })
  })

  before(function (done) {
    Patient.find( function getPatient(err, patients) {
      //console.log('AAAAAAA', err, patients)
      superPatient = patients[0]
      recordUrl = '/patients/' + superPatient.id + '/records'
      done()
    })
  })

  describe('create', function (done) {

    /*
    it('should raise error without required fields', function (done) {
      var request = supertest(app)
      request = request.post(recordUrl)
      request.send({})
      request.expect(400)
      request.expect({ 'parameter': 'required' })
      request.end(done)
    })
    */

    it('should create with valid parameters', function (done) {
      var request = supertest(app)
      request = request.post(recordUrl)
      request.send(superRecordJSON)
      request.expect(201)
      request.end(done)
    })
  })

  describe('list all', function (done) {
    it('should list all records', function (done) {
      var request = supertest(app)
      request = request.get(recordUrl)
      request.expect(200)
      request.expect(function (res) {
        res.body.forEach( function (record) {
          record.should.have.property('patient')
          record.should.have.property('lab')
          record.should.have.property('doctor')
          record.should.have.property('glucose')
          record.should.have.property('redBloodCells')
          record.should.have.property('createdAt')
          record.should.have.property('updatedAt')
        })
      })
      request.end(done)
    })
  })

  describe('details', function (done) {
    /*
    var superRecord
    before( function (done) {
      Record.find( function(err, record) {
        superRecord = record
        done(err)
      })
    })
    */

    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.get(recordUrl + '/invalid')
      request.expect(404)
      request.end(done)
    })

    it('should show details with valid id', function (done) {
      var request = supertest(app)
      request = request.get(recordUrl + '/' + superRecord.id)
      request.expect(200)
      request.expect(function (res) {
        var record = res.body
        record.should.have.property('patient')
        record.should.have.property('lab')
        record.should.have.property('doctor')
        record.should.have.property('glucose')
        record.should.have.property('redBloodCells')
        record.should.have.property('createdAt')
        record.should.have.property('updatedAt')
      })
      request.end(done)
    })
  })

  describe('delete', function (done) {
    /*
    var superRecord
    before( function (done) {
      Record.find( function(err, record) {
        superRecord = record
        done(err)
      })
    })
    */

    it('should raise error with invalid id', function (done) {
      var request = supertest(app)
      request = request.del(recordUrl + '/invalid')
      request.expect(404)
      request.end(done)
    })

    it('should delete with valid id', function (done) {
      var request = supertest(app)
      request = request.del(recordUrl + '/' + superRecord.id)
      request.expect(204)
      request.end(done)
    })
  })
})
