const TransRepository = module.exports;

const TransModel = require('../models/transaction.model');

TransRepository.getByName = (name) => TransModel.find({ user_name: name }).lean().exec();

TransRepository.logTransaction = async (data) => {
  const transaction = new TransModel({
    ...data,
    request: JSON.stringify(data.request),
    response: JSON.stringify(data.response),
  });

  await transaction.save();

  return transaction;
};
