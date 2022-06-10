const UserController = module.exports;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const redis = require('../configs/cache');

function generateJWT(userName) {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign({
    user_name: userName,
  }, jwtSecret, { expiresIn: '24h' });
}

UserController.generate = (res, req) => {
  const { name } = req.body;
  res.send(generateJWT(name));
};

UserController.validate = (res) => res.sendStatus(200);

UserController.create = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send('Name or password missing');
  }

  const result = await UserRepository.getByName(name);

  if (result) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createduser = await UserRepository.createUser({ name, password: hashedPassword });

  const token = generateJWT(name);

  return res.status(200).send({ ...createduser, token });
};

UserController.login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).send('Name or password missing');
  }

  const user = await UserRepository.getByName(name);

  if (!user) return res.status(404).send('User does not exists');

  const hashResult = await bcrypt.compare(password, user.password);

  if (hashResult) {
    await redis.del(`loggin_blacklist:${name}`);

    return res.send({ token: generateJWT(name) });
  }

  return res.status(403).send('Incorrect password');
};

UserController.logout = async (req, res) => {
  await redis.set(`loggin_blacklist:${req.user}`, 'loggedoff', {
    EX: 24 * 60 * 60 * 60,
  });

  return res.send('Logged out successfully');
};
