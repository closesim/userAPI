const router = require('express').Router();

const AVRController = require('../controllers/avr.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.post('/search', authenticateToken, AVRController.search);

module.exports = router;
