const mongoose = require('mongoose')

//mongoose.Promise = global.Promise

const schema = new mongoose.Schema({
  'patient': {
    'type': mongoose.Schema.ObjectId,
    'required': true,
    'ref': 'Patient'
  },
  'lab': {
    'type': String
  },
  'doctor': {
    'type': String
  },
  'glucose': {
    'type': Number
  },
  'redBloodCells': {
    'type': Number
  },
  'whiteBloodCells': {
    'type': Number
  },
  'platelet': {
    'type': Number
  },
  'iron': {
    'type': Number
  },
  'createdAt': {
    'type': Date,
    'default': Date.now
  },
  'updatedAt': {
    'type': Date
  }
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

var Record = mongoose.model('Record', schema)
module.exports = Record
