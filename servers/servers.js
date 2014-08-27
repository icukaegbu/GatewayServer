var app = require('express')();
var request = require('request');
var io = require('socket.io-client');
var server_info = {
  port: process.argv[2] || 5000,
  token: 'bob',
  secret: '',
  gateway: 'http://localhost:27007',
  baseUrl: 'localhost',
  connected: false
};
server_info.address = 'http://localhost:'+ server_info.port;
server_info.name =  process.argv[3] || '/Auth_' + server_info.port;


var socket = io(server_info.gateway);
socket.emit('register', {name:server_info.name, identity:server_info.token, address:server_info.address});


socket.on('register', function(data){
  server_info.secret = data.secret;
  socket.emit('auth', {secret:server_info.secret});
});
socket.on('authorized', function(data){
  console.log('successfully connected to gateway server');
  var info = {name:server_info.name, identity: server_info.token, address: server_info.address};
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
  server_info.connected=true;
});

app.use('/', function(req,res){
  res.send('Welcome to '+ server_info.port + 'on localhost');
});
app.listen(server_info.port);
console.log('listening on', server_info.port);

module.exports.socket = socket;
module.exports.server_info = server_info;