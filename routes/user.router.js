const router = require('express').Router();

const UserController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.post('/generateToken', UserController.generate);

router.post('/signup', UserController.create);
router.post('/login', UserController.login);
router.post('/logout', authenticateToken, UserController.logout);
router.get('/transactions', authenticateToken, UserController.searchLogs);

module.exports = router;
