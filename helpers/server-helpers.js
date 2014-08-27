var dbModels = require('./dbModels');
var db = require('./db-config.js');
var servers = {};
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

module.exports.add = function(info, socket){
  var newServ;
  server[info.name] = socket;
  console.log('stringifying info');
  var infoString = JSON.stringigy(info);
  
  return newServ = new Servers({name:info.name, info:infoString}).save(function(err){
    console.log(err, '<================');
  });
};

module.exports.remove = function(socket, name){
  Servers.findOneAndRemove({name:name}).exec();
};
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