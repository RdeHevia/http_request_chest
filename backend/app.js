const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const incomingRequests = require('./controllers/incomingRequests');
const { api } = require('./controllers/api');


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
// PENDING: display main page: GET / -> static buildMainPage
// PENDING: display bin page: GET /bins/:binId
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', api);
app.use('/', incomingRequests);

app.get("/*", (req, res) => {
  res.redirect('/');
});

module.exports = app;