const UserController = module.exports;
const jwt = require('jsonwebtoken');

UserController.generate = (res) => {
  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign({
    time: Date(),
    userId: 1,
  }, jwtSecret);

  res.send(token);
};

UserController.validate = (res) => res.sendStatus(200);
