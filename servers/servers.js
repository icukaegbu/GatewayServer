var app = require('express')();
var request = require('request');
var io = require('socket.io-client');
var port = 5000;
var token = 'bob';
var secret = '';
var address = 'http://localhost:'+port;
var gateway = 'http://localhost:27007';
var baseUrl = 'localhost';
var name = 'http://www.google.com';

var socket = io(gateway);
socket.emit('register', {name:name, identity:token, address:address});


socket.on('register', function(data){
  secret = data.secret;
  socket.emit('auth', {secret:secret});
});
socket.on('authorized', function(data){
  console.log('successfully connected to gateway server');
  var info = {name:name, identity: token, address: address};
  socket.emit('info', info);
});

socket.on('failed', function(data){
  console.log('Failed with error', data.error);
});
socket.on('forward', function(data){
  console.log('received new connection');
});
socket.on('added', function(){
  console.log('Added to gateway server, waiting...');
});

app.use('/', function(req,res){
  res.send('Welcome to '+ port + 'on localhost');
});
app.listen(5000);
console.log('listening on 5000');