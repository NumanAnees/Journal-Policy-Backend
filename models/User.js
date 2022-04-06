const { model, Schema } = require('mongoose');
const journal = require('../graphql/resolvers/journal');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,

});

module.exports = model('User', userSchema);