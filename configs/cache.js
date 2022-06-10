const { createClient } = require('redis');
const { REDIS_URI } = require('./app');

const client = createClient({
  url: REDIS_URI,
});

client.connect();

module.exports = client;
