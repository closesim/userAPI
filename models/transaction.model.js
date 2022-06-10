const mongoose = require('mongoose');

const { Schema } = mongoose;
const transSchema = new Schema({
  user_name: String,
  resource: String,
  request: String,
  response: String,
  date: Date,
}, { collection: 'transactions' });

module.exports = mongoose.model('transactions', transSchema);
