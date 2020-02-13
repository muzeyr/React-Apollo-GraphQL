const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

app.use('/graphql',graphqlHTTP({
    schema: schema
}));

app.listen(4000,()=>{

    console.log('4000 port dinleniyor....');
});
