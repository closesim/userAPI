require('dotenv').config();

const assert = require('assert');

const API_BASE = '/api';

const {
  PORT,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DB,
  MONGODB_PORT = '27017',
  MONGODB_HOST = 'localhost',
  MONGODB_URI,
  JWT_SECRET,
  TOKEN_HEADER,
} = process.env;

assert(PORT, 'PORT is required');
assert(JWT_SECRET, 'JWT_SECRET is required');
assert(TOKEN_HEADER, 'TOKEN_HEADER is required');

if (!MONGODB_URI) {
  assert(MONGODB_DB, 'MONGODB_DB is required');
  assert(MONGODB_USER, 'MONGODB_USER is required');
  assert(MONGODB_PASSWORD, 'MONGODB_PASSWORD is required');
}

module.exports = {
  PORT,
  API_BASE,
  database: {
    MONGODB_URI,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DB,
    MONGODB_PORT,
    MONGODB_HOST,
  },
};
