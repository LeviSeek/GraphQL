import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
 } from 'graphql';

// let data = [
//   {counter: 32},
//   {counter: 33},
//   {counter: 34}
// ];

// this schema file needs access to mongodb
let Schema = (db) => {

let linkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      links: {
        type: new GraphQLList(linkType),
        resolve: () => db.collection("links").find({}).toArray()
      }
      // message: {
      //   type: GraphQLString,
      //   resolve: () => "Hello GraphQL!"
      // }
    })
  })

  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   fields: () => ({
  //     incrementCounter: {
  //       type: GraphQLInt,
  //       resolve: () => ++counter
  //     }
  //   })
  // })
});
return schema;
}

export default Schema;
