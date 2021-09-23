const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = new mongoose.Schema({
  protocol: String,
  method: String,
  hostname: String,
  path: String,
  ip: String,
  headers: Object,
  body: Object,
}, {timestamps: true});

module.exports = {
  requestSchema,
  Request: mongoose.model('Request', requestSchema)
};