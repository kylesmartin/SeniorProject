
//INIITIALIZATIONS/////////////////////////////////////////////////////////////////////////////////////////

//Server
var express = require('express');
var app = express();
app.listen(3000, function() {
  console.log('listening on 3000');
});

// JSON and url parsers
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// File reader
const fs = require('fs');

//Global variables to simulate databases (for now)
var stores = {"Star Market":
                {
                  "Shelf 1" : ["bananas", "apples", "pears"],
                  "Shelf 2" : ["cereal", "bread"]
                },

              "Trader Joes":
                {
                  "Shelf 1" : ["kiwis", "grapes", "lettuce"],
                  "Shelf 2" : ["milk", "eggs"]
                },

              "Whole Foods":
                {
                  "Shelf 1" : ["blueberries", "strawberries", "oranges"],
                  "Shelf 2" : ["almonds", "cashews"],
                }
            };

//API ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////

// Publish HTML file that displays store selection
app.get('/stores', function(req, res){
  res.sendFile(__dirname + '/stores.html');
});

// Obtain all stored sensor readings
app.get('/getstores', function(req, res){
  var obj = {};
  var keys = [];
  for(var k in stores) keys.push(k);
  obj["Stores"] = keys;
  res.send(obj);
});

