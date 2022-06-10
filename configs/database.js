const mongoose = require('mongoose');
const assert = require('assert');

const {
  database: {
    MONGODB_URI,
    MONGODB_DB,
    MONGODB_HOST,
    MONGODB_PASSWORD,
    MONGODB_PORT,
    MONGODB_USER,
  },
} = require('./app');

if (!MONGODB_URI) {
  assert(MONGODB_DB, 'MONGODB_DB is required');
  assert(MONGODB_USER, 'MONGODB_USER is required');
  assert(MONGODB_PASSWORD, 'MONGODB_PASSWORD is required');
}

const MONGODB_ENV = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}?authSource=admin`;
mongoose.connect((MONGODB_URI || MONGODB_ENV), { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = db;
