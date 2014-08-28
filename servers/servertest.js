var serverHelper = require('../helpers/server-helpers.js');
var spawn = require('child_process').spawn;
var servercount = process.argv[2] || 10;
var portStart = 5000;
var name = 'Auth_';
var servers = [];

//REFACTOR
while(servers.length < servercount){
  var index = servers.length;
  var port = portStart++;
  var n = name + port;
  servers.push(spawn('node', ['./servers.js', port, n], {stdio:'inherit'}));
}
for (var i = 0; i < servers.length; i++) {
	console.log(servers[i]);
};
//console.log(servers);

// var initConnections = function(){
// 	//open a connection to the DB (DONE EXPLICITLY BY SERVERHELPER)

// 	//retrieve the list of all servers DB
// 	servers = serverHelper.servers();

// 	//iterate thru the db list and spawn new processes
// }

// //open a connection to the DB
// var openConnection = function(){
// 	return serverHelper
// }

//add a server to the DB
//	authenticate the server, if he does not exist, add him to the db and to the allowed schema

var addServer = function(){
	//spawn the server
	var newServer = {};
	newServer.port = portStart++;
	newServer.name = name + newServer.port;

	//if port already exists in db, regenerate it
	while ( serverHelper.find( newServer.name ) ){
		newServer.port = portStart++;
		newServer.name = name + newServer.port;
	}

	//add date of creation
	newServer.createdOn = new Date.now;

	//if server does not exit, add to db and spawn
	if ( serverHelper.add(newServer, newServer.port) ) {
		console.log('Added new server: ' + newServer.name);
		spawnServer(newServer);
	}

	return newServer;
}

var spawnServer = function(server){
	servers.push(spawn('node', ['./servers.js', server.port, server], {stdio:'inherit'}));
}

//retrieve the list of all servers DB

//iterate thru the db list and spawn new processes
//refactor out the spawn method to iterate thru the list of servers and spawn them

//log the spawn method to the screen

//update the UI to show connected servers