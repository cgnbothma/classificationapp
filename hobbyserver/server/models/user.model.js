const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  name: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;
