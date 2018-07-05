"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');

const server = express();
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.use(bodyParser.json());



request('https://swapi.co/api/people/1', function (error, response, body) {
    var parsedData = JSON.parse(body);
    server.post("/people", function(req, res) {  
        var person =
          req.body.queryResult &&
          req.body.queryResult.parameters &&
          req.body.queryResult.parameters.people
            ? req.body.queryResult.parameters.people
            : "Unknown";
        return res.json({
          fulfillmentText: person + "'s height is " + parsedData['height'] + "cm",
          source: "person height"
        });
      });
});

server.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });