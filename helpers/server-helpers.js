var servers = {};
var mongo = {};
var allowed = { 'http://www.google.com': 'bob'};

module.exports.servers = servers;

module.exports.find = function(name){
  return servers[name];
};

module.exports.add = function(info, socket){
  servers[info.name] = [socket, info];
};

module.exports.remove = function(socket, name){
  servers[name] = null;
};
module.exports.allowedCheck = function(info){
  var auth = allowed[info.name];
  if(auth === info.identity){
    return true;
  } else {
    return false;
  }
};
module.exports.register = function(token, name, address){
  if(!mongo[token]){
    mongo[token] = {name:name, address:address};
    return true;
  } else {
    return false;
  }
};
module.exports.isAuth = function(secret){
  return mongo[secret] || false;
};