const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

//const uri = 'mongodb://muzeyr:m0320532@graphql-app-shard-00-00-qerqr.mongodb.net:27017/test?ssl=true&replicaSet=graphql-app-shard-0&authSource=admin&retryWrites=true&w=majority';
//const ur =  'mongodb://muzeyr:m0320532@graphql-app-qerqr.mongodb.net/test?retryWrites=true&w=majority';
const uri = 'mongodb://aosgames:aosgames1@ds161224.mlab.com:61224/udemy-gql-app';
mongoose.connect(uri);
mongoose.connection.once('open',()=>{
    console.log('başarılı');
})

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000,()=>{

    console.log('4000 port dinleniyor....');
});
