const jwt = require('jsonwebtoken');

const AuthMiddleware = module.exports;

AuthMiddleware.authenticateToken = ((req, res, next) => {
  const jwtHeader = process.env.TOKEN_HEADER;
  const jwtSecret = process.env.JWT_SECRET;

  const authHeader = req.headers[jwtHeader];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);
  try {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.sendStatus(401);

      req.user = user;
      return next();
    });
  } catch (error) {
    return res.status(401);
  }

  return res.status(401);
});
