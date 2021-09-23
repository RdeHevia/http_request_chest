const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const incomingRequests = require('./controllers/incomingRequests');


const mongoose = require('mongoose');
const morgan = require('morgan');
require('express-async-errors');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('connected to MongoDB');
}).catch(error => {
  console.log(`error connection to MongoDB: ${error.message}`);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', incomingRequests);
// app.use('/api', api)

module.exports = app;