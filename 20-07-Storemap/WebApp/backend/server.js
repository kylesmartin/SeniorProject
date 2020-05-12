'use strict';

//------------Load dependencies------------
const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');
var mysql = require("mysql");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'openstreetmap',
  httpAdapter: 'https', // Default
  apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

//------------CONSTANTS------------
const port=3000;
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-592450.okta.com/oauth2/default',
  clientId: '0oa1qf2z5uDnqNM5s357',
  assertClaims: {
    aud: 'api://default',
  },
});

const app = express();
app.use(cors());

var sql_conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "B!1tz_Pa$$word",
  database:"Blitz"
});
sql_conn.connect(function(err) {
  if (err) throw err;
  console.log("SQL Connection Established!");
});

function addUser(jwt){
  let sql = "INSERT INTO users(email,okta_id) values(?,?);"
  let inject = [jwt.claims.sub,jwt.claims.uid];
  executeQuery(sql,function(err,results){
    if (err) {
      console.log("ERROR : ",err);            
    } else {            
        console.log("result from db is : ",results);
    } 
  },inject);
}

function processUser(jwt){
  console.log(jwt)
  let sql = "SELECT * from users where okta_id= ?;";
  let inject = [jwt.claims.uid];
    executeQuery(sql,function(err,results){
      if (err) {
        console.log("ERROR : ",err);            
      } else {            
          console.log("result from db is : ",results);
          if(results.length==0){
            addUser(jwt);
          }
      } 
    },inject);
}

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      processUser(jwt);
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

function executeQuery(query,callback,inject=null){
  sql_conn.query(query,inject, function(err, results, fields) {
    if (err) 
            callback(err,null);
        else
            callback(null,results);
  });
}


app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json([{message: 'Hello, world!'}]);
});

app.get('/api/stores', authenticationRequired, (req, res) => {
    console.log("get stores");
    let id=1;
    let sql = "SELECT * from store;";
    executeQuery(sql,function(err,results){
      if (err) {
        console.log("ERROR : ",err);            
      } else {         
          var promises = results.map(x=>{
            let cords = x.location.split(",");
            return geocoder.reverse({lat:cords[0],lon:cords[1]})
            .then(function(res) {
                x.location=((typeof res[0].streetNumber === 'undefined') ? "" : res[0].streetNumber) +" "+res[0].streetName+" "+res[0].city+" "+res[0].state + " "+res[0].zipcode;   
                return x;
              })
            .catch(function(err) {
              console.log(err);
              return x;
            });
            
          });
          Promise.all(promises).then(function(results){
            res.json(results); 
          })
          
      } 
    });
});


app.get('/api/lists', authenticationRequired, (req, res) => {
  console.log("get lists");
  let store_id = req.header.store_id;
  let sql = "SELECT * from lists;";
  executeQuery(sql,function(err,results){
    if (err) {
      console.log("ERROR : ",err);            
    } else {            
        console.log("result from db is : ",results);
        res.json(results); 
    } 
  });
});


app.get('/api/items', authenticationRequired, (req, res) => {
  console.log("get items");
  let sql = "SELECT * from items;";
  executeQuery(sql,function(err,results){
    if (err) {
      console.log("ERROR : ",err);            
    } else {            
        console.log("result from db is : ",results);
        res.json(results); 
    } 
  });
});

app.listen(3000, () => {
  console.log('Serve Ready on port 3000');
});
