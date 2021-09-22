const mongoose = require('mongoose');
const config = require('../../utils/config');

const Bin = require('../bins');
const Request = require('../requests');

const initializeBins = async () => {
  await Promise.all([1, 2, 3].map(_ => {
    const bin = new Bin();
    return bin.save();
  }));

  console.log("collection 'bins' created succesfully");
};

const initializeRequests = async () => {
  const bin = await Bin.findOne({});
  const request1 = new Request({
    binId: bin._id,
    rawRequest: '{"a":1,"b":2,"c":"de"}'
  });

  const request2 = new Request({
    binId: bin._id,
    rawRequest: '{"x":1,"y":2,"z":"de"}'
  });

  Promise.all([request1.save(), request2.save()]);
  console.log("collection 'requests' created succesfully");
};

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(async () => {
  console.log('connected to MongoDB');

  const promise1 = mongoose.connection.db.dropCollection('requests');
  const promise2 = mongoose.connection.db.dropCollection('bins');
  await Promise.all([promise1, promise2])
    .then(() => console.log('collections dropped succesfully'))
    .catch((err) => console.log(err));

  await initializeBins();
  await initializeRequests();
}).catch(error => {
  console.log(`error connection to MongoDB: ${error.message}`);
});
