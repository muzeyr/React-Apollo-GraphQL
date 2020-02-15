const graphql = require('graphql');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
}= graphql;

const _ = require('lodash');

const Kitap = require('../models/kitap');
const Yazar = require('../models/yazar');

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
                //return _.find(yazarlar,{id:parent.yazarId});

                return Yazar.findById(parent.yazarId);

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
                //return _.filter(kitaplar,{yazarId: parent.id})
                return Kitap.find({yazarId:parent.id});

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
              //  return _.find(kitaplar,{id:args.id});
                return Kitap.findById(args.id);
            }
        },
        yazar:{
            type:YazarTip,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(yazarlar,{id:args.id});
                return yazar.findById(args.id);
            }
        },
        kitaplar:{
            type:new GraphQLList(KitapTip),
            resolve(parent,args){
                //return kitaplar;
                return Kitap.find({});
            }
        },
        yazarlar:{
            type: new GraphQLList(YazarTip),
            resolve(parent,args){
                return Yazar.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        yazarEkle:{
            type:YazarTip,
            args:{
//                isim:{type:GraphQLString},
//                yas:{type:GraphQLInt}
                isim:{type: new GraphQLNonNull(GraphQLString)},
                yas:{type: new GraphQLNonNull(GraphQLInt)},

            },
            resolve(parent,args){
                let yazar = new Yazar({
                    isim:args.isim,
                    yas:args.yas,
                });

                return yazar.save();
            }
        },
        kitapEkle:{
            type:KitapTip,
            args:{
                //isim:{type:GraphQLString},
                //tur:{type:GraphQLString},
                //yazarId:{type:GraphQLID}
                isim: {type:new GraphQLNonNull(GraphQLString)},
                tur: {type:new GraphQLNonNull(GraphQLString)},
                yazarId: {type:new GraphQLNonNull(GraphQLID)},

            },
            resolve(parent,args){
                let kitap = new Kitap({
                    isim:args.isim,
                    tur:args.tur,
                    yazarId:args.yazarId

                });
                return kitap.save();
            }
        }
    }

});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})