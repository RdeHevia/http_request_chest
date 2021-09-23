const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = new mongoose.Schema({
  rawRequest: String, //to delete
  headers: Object,
  body: Object,
}, {timestamps: true});

// requestSchema.plugin(uniqueValidator);

// requestSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.path = returnedObject.bindId;
//     delete returnedObject.bindId;
//     delete returnedObject.__v;
//   }
// });

// module.exports = mongoose.model('Request', requestSchema);
module.exports = {
  requestSchema,
  Request: mongoose.model('Request', requestSchema)
}