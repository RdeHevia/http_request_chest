const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const { requestSchema } = require('./requests');

const generateId = () => {
  return nanoid(6).toLowerCase();
};

// create new schema
const binSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateId,
  },

  requests: [requestSchema]
}, { timestamps: true });

binSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.path = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Bin', binSchema);