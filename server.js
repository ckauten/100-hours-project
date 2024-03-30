const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

//OpenAI connection
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

//MongoDB Connection
let db,
  dbConnectionStr = process.env.dbConnectionStr;
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

//post method that sends to API and waits for response
app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body; // Destructure 'prompt' from the request body
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    // Send the extracted text back to the client
    res.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error('Failed to fetch OpenAI completion:', error);
    res.status(500).send('Internal Server Error');
  }
});

//server listener
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
