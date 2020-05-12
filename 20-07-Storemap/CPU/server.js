//By Kyle Martin, Lindsey Volk, Cooper Salmon, Mariano Pache, John Gilig

// Modules /////////////////////////////////////////////////////////////////////////////////////////////

//Socket and server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var mysql = require('mysql');
var ip = require('ip');

// JSON and url parsers
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);

// Port and IP of Host
var PORT = 3333; // external is 3333
var HOST = ip.address(); // Kyle's Laptop is .102, Pi is .122

// File reader
const fs = require('fs');
const path = "data.json";
var arr = [];

//API ENDPOINTS/////////////////////////////////////////////////////////////////////////////////////////

// send current store inventory to the server
function update() {
  var sql = "SELECT * FROM products";
  con.query(sql, function(err, result, fields){
    if (err) throw err;
    // send result to cloud;
  });
}

// ask store for current shelf assignments
function ping() {
  // pull from cloud	
  var sql = "SELECT * FROM products";
  con.query(sql, function(err, result, fields){
    if (err) throw err;
    for (var i = 0; i < cloud.length; i++) {
	var qry = "SELECT EXISTS(SELECT * from products WHERE product = '" + cloud[i].product + "')";
	con.query(qry, function(err, result, fields){
	});
    } 
  });
}

//SQL CONNECTION////////////////////////////////////////////////////////////////////////////////////////

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EC464Team7",
  database: "store"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//SOCKET MESSAGE READER/////////////////////////////////////////////////////////////////////////////////

// Send sensor readings to frontend
server.on('message', function (message, remote) {
    var shelf_weight = parseFloat(message.toString());
    if (!Number.isNaN(shelf_weight)) {
	    // update the port and host of the remote device
	    devPORT = remote.port;
	    devHOST = remote.address;
	    var q1 = "SELECT weight FROM shelves WHERE ip = '" + devHOST + "'";
	    con.query(q1, function (err, result, fields) {
		if (err) {
                  console.log(q1);
                  throw err;
                }
		var prev = result[0].weight;
	    	// Update database
	    	var q2 = "SELECT * FROM products WHERE ip = '" + devHOST + "'";
	    	con.query(q2, function (err, result, fields) {
	    	  if (err) {
                    console.log(q2);
	            throw err;
                  }
	    	  // delta represents the weight of the item added
	    	  var sign = (shelf_weight - prev)/Math.abs(shelf_weight - prev);
	    	  var delta = Math.abs(shelf_weight - prev);
	    	  // variables to track the item closest to the weight of delta
	       	  var min_error = Math.abs(result[0].weight - delta);
	    	  var min_ind = 0;
	    	  //variables to track the weight of the current item
	    	  var error = 0;
	    	  //iterate through all products known to the shelf and update the item prediction if necessary
	    	  for (i = 1; i < result.length; i++) {
	      	    error = Math.abs(result[i].weight - delta);
		    if (error < min_error) {
		      min_error = error;
		      min_ind = i;
		    }
		  }
		  // if the weight of delta is closer to the weight of the predicted item than it is to zero, then update the database
		  if (min_error < Math.abs(0 - delta)) {
		    if (sign == 1) {
		      var newcount = result[min_ind].count + 1;
		      console.log(remote.address + ": " + result[min_ind].product + " added");
		    } else {
		      var newcount = result[min_ind].count - 1;
		      console.log(remote.address + ": " + result[min_ind].product + " removed");
		    }
		    // if the new count is less than zero, set to zero
		    if (newcount < 0) {
		      newcount = 0;
		    }
		    var q3 = "UPDATE products SET count = " + newcount + " WHERE product = '" + result[min_ind].product + "'" + " AND ip = '" + result[min_ind].ip + "'";
		    // insert updated count into database
		    con.query(q3, function (err, result) {
		      if (err) {
                        console.log(q3);
		        throw err;
                      }
		      var q4 = "UPDATE shelves SET weight = " + shelf_weight + " WHERE ip = '" + devHOST + "'"; 
		      con.query(q4, function(err, result) {
			if (err) {
                          console.log(q4);
			  throw err;
                        }
		      });
		    });
		  } else {
		    var q5 = "UPDATE shelves SET weight = " + shelf_weight + " WHERE ip = '" + devHOST + "'"; 
		    con.query(q5, function(err, result) {
		      if (err) {
                        console.log(q5);
			throw err;
                      }
		    });
		  }
	      });
	   });
   }
});

//HOST, SOCKET, AND EXPRESS INITIALIZATIONS/////////////////////////////////////////////////////////////

// User socket connection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Listening on port 3000
http.listen(3000, function() {
  console.log('listening on *:3000');
});

// Create server
server.on('listening', function () {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

// Bind server to port and IP
server.bind(PORT, HOST);
