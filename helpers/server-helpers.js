var dbModels = require('./dbModels');
var db = require('./db-config.js');
var addedServers = {};
var mongo = {};

module.exports.mongoPath = function(path){
  db = db(path);
};
//seeding values for testing
var allowed = { 
  'Auth_5001': 'bob',
  'Auth_5002': 'bob',
  'Auth_5003': 'bob',
  'Auth_5004': 'bob',
  'Auth_5005': 'bob',
};
var Allowed = dbModels.Allowed;
var Servers = dbModels.Server;
var Sec = dbModels.Sec;
module.exports.servers = function(){
  return Servers.find().exec().then(function(resp){
    return resp;
  });
};

//search for a server in the list of servers
module.exports.find = function(name){
  return Servers.findOne({name:name}).exec()
  .then(function(found){
    if(found){
      found.info = JSON.parse(found.info);
      return found;
    } else {
      return false;
    }
  });
};

//add a server to the list of servers
module.exports.add = function(info, socket){
  console.log('Received call to add server: '+info.name);
  var newServ;
  addedServers[info.name] = socket;
  console.log('stringifying info');
  var infoString = JSON.stringify(info);
  
  return newServ = new Servers({name:info.name, info:infoString}).save(function(err){
    console.log(err, '<================');
  });
};

//remove a server from the list of servers
module.exports.remove = function(socket, name){
  Servers.findOneAndRemove({name:name}).exec();
};

//check if this server is allowed to connect to the routing server
module.exports.allowedCheck = function(info){
  return Allowed.findOne({name:info.name, identity:info.identity}).exec().
  then(function(found){
    if(found){
      return true;
    } else {
      return false;
    }
  });
};

//create a token for registering a server with the routing server
//and adds the user to authenticating list
module.exports.register = function(token, name, address){
  return Sec.findOne({token:token}).exec()
  .then(function(found){
    if(found){
      return false;
    } else {
      new Sec({token:token, name:name, address:address}).save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Added user', name, 'to authentication list');
        }
      });
      return true;
    }
  });
};

//authenticate if a server can connect to the routing server
module.exports.isAuth = function(secret){
  return Sec.findOne({token:secret}).exec()
  .then(function(resp){
    if(resp){
      return true;
    } else {
      return false;
    }
  });
};