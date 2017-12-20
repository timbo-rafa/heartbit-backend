const router = require('express').Router({ mergeParams: true })

const Record = require('./record-model')

router.use(function (request, response, next) {
  console.log('record-controller middleware', request.body, request.patient)
  request.body.patient = request.patient
  next()
})

router
  .route('/')
  .get(function listRecords(req, res, next) {
    'use strict'

    // treat ?query= (?)
    Record.find({ "patient" : req.patient._id }, function (err, records) {
      console.log('====findRecords', err, records)
      if (err) {
        return next(err)
      }
      return res.status(200).send(records)
    })
})

  .post(function addRecord(request, response, next) {
    'use strict'

    
    var record  = new Record(request.body)
    console.log('new record', request.body, record)
    record.save(function (error) {
      if (error) {
        return next(error)
      }
      return response.status(201).send(record)
    })
  })

router
  .route('/:record')
  .get(function getRecord(request, response, next) {
    'use strict'

    var record = request.record

    return response.status(200).send(record)
  })

router
  .route('/:record')
  .delete(function deleteRecord (request, response, next) {
    'use strict'

    var record = request.record
    return record.remove(function removedRecord (error) {
      if (error) return next(error)

      return response.status(204).end()
    })
  })

router.param('record', function findRecord (request, response, next, id) {
  'use strict'

  console.log('record-controller rparam', id)

  var query = Record.findOne()
  query.where('_id').equals(id)
  query.exec(function foundRecord (error, record) {
    console.log('record param mongo callback', error, record)
    if (error) return next(error)
    if (!record) return response.status(404).end()
    request.record = record
    return next()
  })
})

module.exports = router
