import express from 'express';
import {MongoClient} from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { log } from 'util';

let app = express();

// need to signup at mLab, then create links within collection, also have to authorize
// via db user which should be created, note: not the username/password used to login to mlab.

let dbUrl = 'mongodb://levijs:14DianaDrive@ds137826.mlab.com:37826/levijs';
app.use(express.static('public'));

// use async with await

(async() => {
  let db;
  try {
    db = await MongoClient.connect(dbUrl);
    app.use('/graphql', GraphQLHTTP({
      schema: schema(db),
      graphiql: true
    }));
  } catch(e) {
    console.log("err to connect to mongo db with:", e)
    throw e;
  }

  app.listen(3000, () => console.log("listening on port 3000"));
})();
