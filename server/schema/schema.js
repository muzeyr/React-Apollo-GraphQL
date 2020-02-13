const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema}= graphql;

const KitapTip = new GraphQLObjectType({
    name:'Kitap',
    fields:()=>({
        id:{type: GraphQLString},
        name:{type:GraphQLString},
        tur:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryTip',
    fields:{
        kitap:{
            type:KitapTip,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //db den gelecek veriler burada oalcak
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})