const { model, Schema } = require('mongoose');
const journal = require('../graphql/resolvers/journal');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  journals: [{ type: Schema.Types.ObjectId, ref: "journals" }]
});

module.exports = model('User', userSchema);