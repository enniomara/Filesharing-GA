'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');

var configDB = require('./db/config.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(morgan('dev')); // log every request to the console

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Pass to next layer of middleware
    next();
});


var router = express.Router();              // get an instance of the express Router
// routes ======================================================================
require('./routes.js')(app, router); // load our routes and pass in our app


var server = app.listen(3232, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
