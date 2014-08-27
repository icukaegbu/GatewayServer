var env = require('./helpers/env');
var io = require('socket.io')();
var express = require('express');
var handler = require('./helpers/request-handlers');
var parser = require('body-parser');

//
var app = express();

io.listen(env.port);
handler.log('listening on ', env.port);
handler.mongoPath(env.mongo);
io.on('connection', function(socket){

  handler.log('received a connection');

  //requests authentication secret from this socket
  socket.on('register', function(data){
    handler.register(data, socket);
  });

  //Authenticates servers who alread have secrets
  socket.on('auth', function(data){
    handler.auth(data, socket, Auth);
  });

  //Sets event handlers once socket is authorized
  function Auth(){
    var store = {};
    socket.on('info', function(data){
      store.info = data;
      handler.info(data, socket);
    });

    socket.on('disconnect', function(socket){
      handler.deleteSocket(store.info, socket);
    });
  }
});

app.use(parser.json());
app.get('/server', handler.redirectTo);
app.listen(env.port+1);

