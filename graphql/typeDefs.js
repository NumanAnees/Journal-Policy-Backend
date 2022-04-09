const {gql} = require('apollo-server');
module.exports = gql`
 type Journal{
    id: ID!
    title: String!
    url: String!
    issn: String!
    rating: String!
    date: String!
    policies: [Policy]!
    domain: String!
    postedBy: User!
    createdAt: String!
  }
  type Policy{
    title: String
    first_year: String
    last_year: String
    policy_type: String
  }
  input policyInput{
    title: String
    first_year: String
    last_year: String
    policy_type: String
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
    date: String!
    policies: policyInput!
    domain: String!
  }
  type Query {
    getUserJournals: [Journal]
    getJournals: [Journal]
    getJournal(issn: String!): Journal
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createJournal(journalInput: JournalInput): Journal!
    deleteJournal(issn: String!): String!
    updateJournal(journalInput: JournalInput): Journal!
  }
`;