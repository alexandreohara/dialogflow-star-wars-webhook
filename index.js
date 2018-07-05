const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
request('https://swapi.co/api/people/1', function (error, response, body) {
    var parsedData = JSON.parse(body);
    console.log(parsedData);
});

const server = express();
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.use(bodyParser.json());

server.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Try again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

// var request = require('request'); //assuming you installed this module
// app.get('/api/twitter/connect', function(req, res){
//   request(TWITTER_API_URL + API_KEYS, function(err, body){
//       res.json(body); //res is the response object, and it passes info back to client side
//   });
// });