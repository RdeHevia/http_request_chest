const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = new mongoose.Schema({
  binId: {
    type: String,
    ref: "Bin"
  },
  rawRequest: {
    type: String,
    required: true
  },
  headers: Object,
  body: Object,
});

requestSchema.plugin(uniqueValidator);

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.path = returnedObject.bindId;
    delete returnedObject.bindId;
  }
});

module.exports = mongoose.model('Request', requestSchema);