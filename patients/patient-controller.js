const router = require('express').Router()

const Patient = require('./patient-model')

console.log('patient-controller')
router
  .route('/')
  .get(function listPatients(req, res, next) {
    'use strict'

    // treat ?query= (?)
    Patient.find({}, function (err, patients) {
      //console.log('find', err, patients)
      if (err) {
        return next(err)
      }
      return res.status(200).send(patients)
    })
})

  .post(function addPatient(request, response, next) {
    'use strict'

    console.log(request.body)
    var patientJSON = request.body
    patientJSON.id = patientJSON.name

    //patientJSON.createdAt = Date.now()
    var patient  = new Patient(patientJSON)
    //console.log('new patient', request.body, patient)
    patient.save(function (error) {
      if (error) {
        return next(error)
      }
      return response.status(201).send(patient)
    })
  })

router
  .route('/:patient')
  .get(function getPatient(request, response, next) {
    'use strict'

    var patient = request.patient

    return response.status(200).send(patient)
  })

  .put(function editPatient(request, response, next) {
    'use strict'

    var patient = request.patient 

    patient = Object.assign(patient, request.body)

    console.log('editing patient', patient)
    return patient.save( function editPatient(error, savedPatient) {
      console.log('edited patient', error, savedPatient)
      if (error) return next(error)
      return response.status(200).send(patient)
    })
  })

router
  .route('/:patient')
  .delete(function deletePatient (request, response, next) {
    'use strict'

    var patient = request.patient
    return patient.remove(function removedPatient (error) {
      if (error) return next(error)

      // TODO remove associated records
      return response.status(204).end()
    })
  })

router.param('patient', function findPatient (request, response, next, id) {
  'use strict'

  console.log('patient-controller rparam', id)
  var query = Patient.findOne()
  query.where('_id').equals(id)
  query.exec(function foundPatient (error, patient) {
    console.log('patient param mongo callback', error, patient)
    if (error) return next(error)
    if (!patient) return response.status(404).end()
    request.patient = patient
    return next()
  })
})

const recordRouter = require('./records/record-controller')
router.use('/:patient/records',recordRouter)

module.exports = router
