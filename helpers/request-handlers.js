var serverHelpers = require('./server-helpers');
var bcrypt = require('bcrypt');

//Adds a socket to the list of available servers to forward to
module.exports.addSocket = function(info, socket){
  var taken = serverHelpers.find(info);
  if(!taken){
    serverHelpers.add(info, socket);
    return true;
  } else {
    return false;
  }
};

//displays available servers
module.exports.printServers = function(){
  log(serverHelpers.servers);
};

//Redirects clients to requested servers
module.exports.redirectTo = function(req, res){
  var name = req.body.name;
  var info = serverHelpers.find(name);
  log('redirecting connection to', name);
  res.redirect(info[1].address);
};

//Removes server from pool
module.exports.deleteSocket = function(info, socket){
  serverHelpers.remove(info.name);
  log('Removed', info.name);
};

//Registers a server with the gateway, server must be on allowed list
//Servers are provided secrets on completion if they are allowed
module.exports.register = function(info, socket){
  var allowed = serverHelpers.allowedCheck(info);
  if(allowed){
    var combine = info.name + info.identity;
    bcrypt.hash(combine, 5, function(err, hash){
      var save = serverHelpers.register(hash, info.name, info.address);
      if(save){
        socket.emit('register', {secret:hash});
      } else {
        socket.emit('failed', {error: 'Already registered'});
      }
    });
  } else {
    socket.emit('failed', {error: 'Not Allowed'});
  }  
};

//For registered servers, when they reconnect they must authenticate
//using provided secret
module.exports.auth = function(info, socket, callback){
  var secret = info.secret;
  var authed = serverHelpers.isAuth(secret);
  if(!authed){
    socket.emit('failed', {error: 'You do not have the right secret'});
  } else {
    socket.emit('authorized');
    callback();
  }
};

//Retrieves servers data for queries from clients
module.exports.info = function(info, socket){
  var adding = module.exports.addSocket(info, socket);
  if(adding){
    socket.emit('added');
    log('Added', info.name, 'to list of servers');
  } else {
    socket.emit('failed', {error:'Unable to add to server list'});
  }
};
module.exports.log = log;

function log(){
  var args = Array.prototype.slice.call(arguments, 0);
  var m = [new Date(Date.now()), ':'].concat(args);

  console.log(m.join(' '));
}