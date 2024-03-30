const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

//MongoDB Connection
let db,
  dbConnectionStr =
    'mongodb+srv://ckauten:Rut79418!@ai-test.onp6o1e.mongodb.net/?retryWrites=true&w=majority&appName=ai-test',
  dbName = 'ai-test';

MongoClient.connect(dbConnectionStr).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});

//setting up the server
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get request to render index.ejs
app.get('/', (req, res) => {
  res.render('index.ejs');
});

//server listener
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
