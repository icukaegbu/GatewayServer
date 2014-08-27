var spawn = require('child_process').spawn;
var servercount = process.argv[2] || 10;
var portStart = 5000;
var name = 'Auth_';
var servers = [];
while(servers.length < servercount){
  var index = servers.length;
  var port = portStart++;
  var n = name + port;
  servers.push(spawn('node', ['./servers.js', port, n], {stdio:'inherit'}));
}