const router = require('express').Router();
const Healthcheck = require('./healthcheck');

router.use('/healthcheck', Healthcheck);

module.exports = router;
