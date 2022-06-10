require('dotenv').config();

const assert = require('assert');

const API_BASE = '/api';

const {
  PORT,
} = process.env;

assert(PORT, 'PORT is required');

module.exports = {
  PORT,
  API_BASE,
};
