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
  AVR_API_KEY,
  REDIS_URI,
} = process.env;

assert(PORT, 'PORT is required');
assert(JWT_SECRET, 'JWT_SECRET is required');
assert(TOKEN_HEADER, 'TOKEN_HEADER is required');

module.exports = {
  PORT,
  API_BASE,
  AVR_API_KEY,
  REDIS_URI,
  database: {
    MONGODB_URI,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DB,
    MONGODB_PORT,
    MONGODB_HOST,
  },
};
