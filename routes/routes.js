const router = require('express').Router();

const Healthcheck = require('./healthcheck');
const UserRouter = require('./user.router');

router.use('/healthcheck', Healthcheck);
router.use('/user', UserRouter);

module.exports = router;
