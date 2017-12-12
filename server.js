import express from 'express';
import {MongoClient} from 'mongodb';

let app = express();
let dbUrl = 'mongodb://levijs:14DianaDrive@ds137826.mlab.com:37826/levijs';
let db;

app.use(express.static('public'));

MongoClient.connect(dbUrl, (err, database) => {
  if (err) {
    console.log('cound not connect');
    throw err;
  }

  db = database;
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
