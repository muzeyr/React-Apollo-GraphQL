const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
mongoose.connect('mongodb://muzer:m0320532@graphql-app-shard-00-00-qerqr.mongodb.net:27017,graphql-app-shard-00-01-qerqr.mongodb.net:27017,graphql-app-shard-00-02-qerqr.mongodb.net:27017/test?ssl=true&replicaSet=graphql-app-shard-0&authSource=admin&retryWrites=true&w=majority');
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
