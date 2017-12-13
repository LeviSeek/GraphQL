import express from 'express';
import {MongoClient} from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

let app = express();

// need to signup at mLab, then create links within collection, also have to authorize
// via db user which should be created, note: not the username/password used to login to mlab.

let dbUrl = 'mongodb://levijs:14DianaDrive@ds137826.mlab.com:37826/levijs';
let db;

app.use(express.static('public'));


MongoClient.connect(dbUrl, (err, database) => {
  if (err) {
    console.log('cound not connect');
    throw err;
  }

  db = database;

  // to make sure schema file has access to mongodb
  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }))

  app.listen(3000, () => console.log('listening on port 3000'));
});

app.get('/data/links', (req, res) => {
  db.collection("links").find({}).toArray((err, links) => {
    if (err) {
      console.log("db collection error:", err);
      throw err;
    }

    res.json(links);
  });
});
