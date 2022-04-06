const usersResolvers = require('./users');
const journalsResolvers = require("./journal");
module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...journalsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...journalsResolvers.Mutation
  }

};