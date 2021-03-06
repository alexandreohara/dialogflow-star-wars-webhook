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


request('https://swapi.co/api/people/', function (error, response, body) {
    var parsedData = JSON.parse(body);
    for (var index in parsedData['results']) {
        console.log(JSON.stringify(parsedData['results'][index]['height']));
    }
    server.post("/people", function(req, res) {  
        var person = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.people ? JSON.stringify(req.body.queryResult.parameters.people) : "Unknown";
        for (var index in parsedData['results']) {
            var characterName = JSON.stringify(parsedData['results'][index]['name']);
            if (person == characterName) {
                return res.json({
                    fulfillmentText: req.body.queryResult.parameters.people + "'s height is " + parsedData['results'][index]['height'] + "cm",
                    source: "person height"
                });
            }
        }
        return res.json({
            fulfillmentText: person + characterName,
            source: "person height"
        });


      });
});

server.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
  });