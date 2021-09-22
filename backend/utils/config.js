require('dotenv').config();

const PORT = 3001;
const MONGODB_URI = "mongodb://localhost:27017/test_airlines";

module.exports = {
  PORT,
  MONGODB_URI
};