import express from 'express';
import {MongoClient} from 'mongodb';

let app = express();

app.use(express.static('public'));

app.listen(3000);

// using 'mongodb://localhost:27017/myLocalDb'
// MongoClient.connect(process.env.MONGO_URL, (err, database) => {
//   if (err) {
//     throw err;
//   }
//
//   database.collection("links").find({}).toArray((err, links) => {
//     if (err) {
//       throw err;
//     }
//
//     console.log("links for mongo:", link);
//   });
// });
