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

server.post("/people", function(req, res) {
  var person =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.people
      ? req.body.result.parameters.people
      : "Unknown";
  return res.json({
    speech: person + "'s height is xxx",
    displayText: person + "'s height is xxx",
    source: "person height"
  });
});

server.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });