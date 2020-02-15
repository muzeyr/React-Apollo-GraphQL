const graphql = require('graphql');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
        }= graphql;

const _ = require('lodash');

var kitaplar = [
    {isim:'Harry Potter',tur:'Fantastik',id:'1',yazarId:'1'},
    {isim:'Yüzüklerin Efendisi',tur:'Fantastik',id:'2',yazarId:'2'},
    {isim:'Sherlock Holmes',tur:'Fantastik',id:'3',yazarId:'3'},

    {isim:'Harry Potter 3',tur:'Fantastik',id:'4',yazarId:'3'},
    {isim:'Yüzüklerin Efendisi 2',tur:'Fantastik',id:'5',yazarId:'2'},
    {isim:'Sherlock Holmes 2',tur:'Fantastik',id:'6',yazarId:'2'}


];

var yazarlar = [
    { isim: 'Ali Hazır', yas:35, id:"1"},
    { isim: 'Osman Hazır', yas:25, id:"2"},
    { isim: 'Esra Demir', yas:55, id:"3"},
    { isim: 'Halit Aydın' ,yas:38, id:"4"}
];
/*
Aşağıdaki gibi era fonsiyon olarak tanımlı olan kod blokları içinde tanımlı olan değişkenleri 
tüm sayfada olup olmadığına bakar,
    fields:()=>({
    fields:{ şeklinde tanımlı olan fonkyion içindekileri sadece o kod bloğu içinde olup olmadığına bakar}
*/
const KitapTip = new GraphQLObjectType({
    name:'Kitap',
    fields:()=>({
        id:{type: GraphQLID},
        isim:{type:GraphQLString},
        tur:{type:GraphQLString},
        yazar:{type:YazarTip,
            resolve(parent,args){
                return _.find(yazarlar,{id:parent.yazarId});

            }
        }
    })
});

const YazarTip = new GraphQLObjectType({
    name:'Yazar',
    fields:()=>({
        id:{type: GraphQLID},
        yas:{type:GraphQLInt},
        isim:{type:GraphQLString},
        kitaplar: {
            type: new GraphQLList(KitapTip),
            resolve(parent,args){
                return _.filter(kitaplar,{yazarId: parent.id})

            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryTip',
    fields:{
        kitap:{
            type:KitapTip,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(kitaplar,{id:args.id});
            }
        },
        yazar:{
            type:YazarTip,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(yazarlar,{id:args.id});
            }
        },
        kitaplar:{
            type:new GraphQLList(KitapTip),
            resolve(parent,args){
                return kitaplar;
            }
        },
        yazarlar:{
            type: new GraphQLList(YazarTip),
            resolve(parent,args){
                return yazarlar;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})