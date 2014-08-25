var express = require('express');
var env = require('./helpers/env');
var app = express();

app.use('/', function(req, res){
  res.send('Hello World');
});

module.exports.port = env.port;
module.exports.app = app;