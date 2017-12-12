const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  'name': {
    'type': String,
    'required': true
  },
  'createdAt': {
    'type': Date,
    'default': Date.now
  },
  'updatedAt': {
    'type': Date
  },
  'records': [{
    'type': mongoose.Schema.ObjectId,
    'ref' : 'Record'
  }]
}, {
  'strict': true,
  'toJSON': {
    'virtuals': true
  },
  'toObject': {
    'virtuals': true
  }
})

schema.pre('save', function setUpdatedAt (next) {
  'use strict'

  this.updatedAt = new Date()
  next()
})

schema.pre('update', function setUpdatedAt (next) {
  'use strict'

  this.updatedAt = new Date()
  next()
})

var Patient = mongoose.model('Patient', schema)
module.exports = Patient
