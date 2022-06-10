/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./configs/database');
const { PORT, API_BASE } = require('./configs/app');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(API_BASE, routes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`${err}`);
  }

  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;
