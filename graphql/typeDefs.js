const {gql} = require('apollo-server');
module.exports = gql`
 type Journal{
    id: ID!
    title: String!
    url: String!
    issn: String!
    Rating: String!
    body: String!
    username:String!
  }
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getJournals: [Journal]
    getJournal(journalId: ID!): Journal
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createJournal(body: String!): Journal!
    deleteJournal(journalId: ID!): String!
  }
`;