//A file for available ports and other env specific tasks

var mongo = process.env.MONGO_PATH || 'mongodb://localhost/gateway';
var gateway_port = process.env.PORT || 27007;
var server_port_start = 5000;
var server_ports = {};

var get_port = function(){
  for(var i in server_ports){
    if(server_ports[i] === null){
      return i;
    }
  }
  return server_port_start++;
};
var unset_port = function(port){
  if(server_ports[port]){
    server_ports[port] = null;
    return true;
  } else {
    return undefined;
  }
};
var set_port = function(port){
  if(!server_ports[port]){
    return server_ports[port] = true;
  } else {
    return false;
  }
};

module.exports = {
  mongo: mongo,
  port: gateway_port,
  get: get_port,
  set: set_port,
  unset:unset_port
};