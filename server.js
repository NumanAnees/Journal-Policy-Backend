const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const User = require('./models/User');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
    type User{
        email: String!
        createdAt: String!
        username: String!
        password: String!
    }
    type Query {
    getUser:[User]
  }
`;

const resolvers = {
  Query: {
    async getUser(){
        try{
            const users = await User.find();
            return users;
        }
        catch(err)
        {
            throw new Error(err);
        }
    }
}
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
mongoose.connect(MONGODB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("DB connected")
    return server.listen({port:5000})
}).then((res)=>{
    console.log(`Server running at ${res.url}`);
})