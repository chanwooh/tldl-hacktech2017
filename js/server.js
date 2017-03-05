// Express.js
const express = require('express');
const app = express();
const port = 8080;

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'hardy-thinker-138823';

// Instantiates a client
const translateClient = Translate({
  projectId: projectId
});

// Probably not necessary
app.get('/', (request, response) => {  
});

// Route to summarize the text
app.get('/summary', (req, res) => {

  var unirest = require('unirest');

  unirest.post("https://cotomax-summarizer-text-v1.p.mashape.com/summarizer")
    .header("X-Mashape-Key", "tYe19sDdFDmshbS4t7MTT2QZsJJMp1bwCrqjsnW2TAuD70gynW")
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .send({"Percent":"30","Language":"en","Text":req.query.raw_text})
    .end(function (result) {
        res.jsonp(result.body);
    });

});

// Route to translate the text
app.get('/translate', (req, res) => {

  const text = req.query.raw_text;
  const target = req.query.language;

  // Translates some text into "target"
  translateClient.translate(text, target).then((results) => {
    
    res.jsonp(results[0]);
                
  });

});

// Probably not necessary, but may need to avoid Access-Control Error
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Node.js listening to the port number
app.listen(port, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});