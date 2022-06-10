const UserRepository = module.exports;

const UserModel = require('../models/user.model');

UserRepository.getById = (id) => UserModel.find({ id }).lean().exec();

UserRepository.createUser = (userData) => {
  const userDetails = new UserModel({
    ...userData,
  });

  userDetails.save((err, user) => {
    if (err) return console.error(err);
    return console.log(`${user.name} saved to user collection.`);
  });
};
