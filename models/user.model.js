const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  creationDate: String,
}, { collection: 'users' });

module.exports = mongoose.model('users', userSchema);
