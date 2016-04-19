'use strict';

var fs = require('fs'),
    https = require('https'),
    express = require('express');

var port = 4430;

var options = {
    key: fs.readFileSync('./ssl/bbcnewsbot.key'),
    cert: fs.readFileSync('./ssl/bbcnewsbot.pem'),
};

var app = express();

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.get('/', function (req, res) {
  res.json({"Result":"success"});
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === "say_hello_to_the_one_and_only") {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
