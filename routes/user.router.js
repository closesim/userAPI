const router = require('express').Router();

const UserController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.post('/generateToken', UserController.generate);
router.get('/validateToken', authenticateToken, UserController.validate);

router.post('/signup', UserController.create);
router.post('/login', UserController.login);

module.exports = router;
