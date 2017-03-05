const express = require('express');
const app = express();
const port = 8080;

app.get('/', (request, response) => {  
  	//response.send(response.withHeader('Access-Control-Allow-Origin', 'http://localhost:8080'));
});

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

app.listen(port, (err) => {  
  	if (err) {
    	return console.log('something bad happened', err)
  	}

  	console.log(`server is listening on ${port}`)
});