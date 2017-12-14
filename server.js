import express from 'express';
import {MongoClient} from 'mongodb';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import { log } from 'util';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import fs from 'fs';

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
    let schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({
      schema: schema,
      graphiql: true
    }));

    let json = await graphql(schema, introspectionQuery);
    
    if (!fs.existsSync('./data/schema.json')) {
      fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
        if (err) {
          console.log("fail to write json due to err:", err)
          throw err;
        }
        console.log("JSON schema created");
      })
    }
  } catch(e) {
    console.log("err to connect to mongo db with:", e)
    throw e;
  }

  app.listen(3000, () => console.log("listening on port 3000"));

})();
