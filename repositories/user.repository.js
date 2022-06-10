const UserRepository = module.exports;

const UserModel = require('../models/user.model');

UserRepository.getByName = (name) => UserModel.findOne({ name });

UserRepository.createUser = async (userData) => {
  const userDetails = new UserModel({
    ...userData,
  });

  await userDetails.save();

  return userDetails;
};
