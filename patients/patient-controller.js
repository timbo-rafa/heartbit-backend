const router = require('express').Router()

const Patient = require('./patient-model')

console.log('patient-controller')
router
  .route('/')
  .get(function (req, res, next) {
    'use strict'

    // treat ?query= (?)
    Patient.find({}, function (err, patients) {
      //console.log('find', err, patients)
      if (err) {
        return next(err)
      }
      return res.status(200).send(patients)
    })
    console.log('pc / get')
})

  .post(function (request, response, next) {
    'use strict'

    var patient  = new Patient(request.body)
    console.log('new pat', request.body, patient)
    patient.save(function (error) {
      if (error) {
        return next(error)
      }
      return response.status(201).end()
    })
  })

router
  .route('/:patient')
  .get(function getPatient(request, response, next) {
    'use strict'

    var patient = request.patient

    return response.status(200).send(patient)
  })

router.param('patient', function findPatient (request, response, next, id) {
  'use strict'

  var query = Patient.findOne()
  query.where('_id').equals(id)
  query.exec(function foundPatient (error, patient) {
    if (error) return next(error)
    if (!patient) return response.status(404).end()
    request.patient = patient
    return next()
  })
})

module.exports = router
