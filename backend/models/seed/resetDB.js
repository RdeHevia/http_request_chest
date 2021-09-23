const mongoose = require('mongoose');
const config = require('../../utils/config');

const Bin = require('../bins');
const { Request } = require('../requests');

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
    rawRequest: '{"a":1,"b":2,"c":"de"}'
  });

  const request2 = new Request({
    rawRequest: '{"x":1,"y":2,"z":"de"}'
  });

  bin.requests.push(request1, request2);
  await bin.save();
  console.log("request1 and 2 added to the first bin succesfully");
};

const printFirstBinStuff = async () => {
  const bin = await Bin.findOne({});
  console.log(' FIRST-BIN:');
  console.log(bin);
  console.log('-----------------------');
  console.log("FIRST-BIN'S REQUESTS:");
  console.log(bin.requests);
  console.log('-----------------------');
  console.log("REQUEST AT IDX=1 OF THE FIRST BIN");
  console.log(bin.requests[0]);
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
  printFirstBinStuff ();
}).catch(error => {
  console.log(`error connection to MongoDB: ${error.message}`);
});

/*
Bins
{
  id (path),
  requests: [request1, request2....]
}

each request has the same schema:
{
  rawRequest,
  headers,
  body,
  ip,
  ....
}
*/
