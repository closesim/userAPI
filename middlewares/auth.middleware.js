const jwt = require('jsonwebtoken');
const redis = require('../configs/cache');
const TransRepository = require('../repositories/transactions.repository');

const AuthMiddleware = module.exports;

AuthMiddleware.authenticateToken = (async (req, res, next) => {
  const jwtHeader = process.env.TOKEN_HEADER;
  const jwtSecret = process.env.JWT_SECRET;

  const authHeader = req.headers[jwtHeader];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  try {
    const { user_name: userName } = jwt.verify(token, jwtSecret);

    if (await redis.get(`loggin_blacklist:${userName}`)) {
      return res.sendStatus(401);
    }

    await TransRepository.logTransaction({
      user_name: userName,
      request: req.body,
      resource: `${req.method} ${req.originalUrl}`,
      date: new Date(),
    });

    req.user = userName;
    return next();
  } catch (error) {
    return res.status(401);
  }
});
