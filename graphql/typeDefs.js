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
    postedBy: User!
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
  input JournalInput{
    title: String!
    url: String!
    rating: String!
    issn: String!
  }
  type Query {
    getUserJournals: [Journal]
    getJournals: [Journal]
    getJournal(issn: String!): Journal
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createJournal(journalInput: JournalInput): Journal!
    deleteJournal(issn: String!): String!
    updateJournal(journalInput: JournalInput): Journal!
  }
`;