const router = require('express').Router();

const Healthcheck = require('./healthcheck');
const UserRouter = require('./user.router');
const AVRRouter = require('./avr.router');

router.use('/healthcheck', Healthcheck);
router.use('/user', UserRouter);
router.use('/avr-data', AVRRouter);

module.exports = router;
