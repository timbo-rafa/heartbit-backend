const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  '_id': {
    'type': String
  },
  /*
  'name': {
    'type': String,
    'required': true
  },
  */
  'age': {
    'type': Number
  },
  'doctor': {
    'type': String
  },
  'insurance': {
    'type': String
  },
  'createdAt': {
    'type': Date,
    'default': Date.now
  },
  'updatedAt': {
    'type': Date
  },
}, {
  'strict': true,
  'toJSON': {
    'virtuals': true
  },
  'toObject': {
    'virtuals': true
  }
})

schema.virtual('name')
  .set(function (name) {
    this._id = name
  })
  .get(function () {
    return this._id//.toString()
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
