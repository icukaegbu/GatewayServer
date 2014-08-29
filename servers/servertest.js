var serverHelper = require('../helpers/server-helpers.js');
var spawn = require('child_process').spawn;
var servercount = process.argv[2] || 10;
var portStart = 5000;
var name = 'Auth_';
var spawnedServers = [];
var allServers = [];

//REFACTOR
// while(servers.length < servercount){
//   var index = servers.length;
//   var port = portStart++;
//   var n = name + port;
//   servers.push(spawn('node', ['./servers.js', port, n], {stdio:'inherit'}));
// }
// for (var i = 0; i < servers.length; i++) {
// 	console.log(servers[i]);
// };
//console.log(servers);

var initConnections = function(){
	//open a connection to the DB (DONE EXPLICITLY BY SERVERHELPER)
	//retrieve the list of all servers DB
	allServers = getAllServers();
	console.log('Servers from db ', allServers.length );

	//iterate thru the db list and spawn new processes
	for (var i = 0; i < allServers.length; i++) {
		console.log('Server: ',allServers[i] );
		spawnedServers.push(spawnServer(allServers[i]));
	};
}


//add a server to the DB
//	authenticate the server, if he does not exist, add him to the db and to the allowed schema
var addServer = function(){
	//spawn the server
	var newServer = {};
	// newServer.port = portStart++;
	// newServer.name = name + newServer.port;
	console.log(newServer);

	//if port already exists in db, regenerate it
	newServer = checkServer(newServer);

	// while ( !serverHelper.find( newServer.name ) ){
	// 	console.log('Made it here');
	// 	newServer.port = portStart++;
	// 	newServer.name = name + newServer.port;
	// 	console.log('Baking server: '+newServer);
	// }

	//add date of creation
	newServer.createdOn = Date.now;

	//if server does not exit, add to db and spawn
	var n = serverHelper.add(newServer, newServer.port);
	console.log(n);
	if ( n ) {
		console.log('Added new server: ' + newServer.name);
		spawnedServers.push(spawnServer(newServer));
		allServers.push(newServer);
	}

	return newServer;
}

var spawnServer = function(server){
	return spawn('node', ['./servers.js', server.port, server], {stdio:'inherit'});
}

//retrieve the list of all servers DB
var getAllServers = function(){
	return serverHelper.servers();
}

//recursive function to check if server port already exists
var checkServer = function(newServer){
	newServer.port = ++portStart;
	newServer.name = name + newServer.port;
	console.log('In checkServer: ' + newServer.name);

	if ( allServers.length === 0 ){
		return newServer;
	}

	for (var i = 0; i < allServers.length; i++ ){
		if ( newServer.name === allServers[i].name ){
			console.log('Going recursive: '+newServer.name);
			checkServer(newServer);
		}
	}

	return newServer;
}

//START UP
//initConnections();

//while(spawnedServers.length < servercount){
var i = 0;
while( i < 5 ){
  //var index = spawnedServers.length;
  console.log('Calling adserver: ');
  addServer();
  ++i;
}
for (var i = 0; i < spawnedServers.length; i++) {
	console.log(spawnedServers[i].name);
};

//iterate thru the db list and spawn new processes
//refactor out the spawn method to iterate thru the list of servers and spawn them

//log the spawn method to the screen

//update the UI to show connected servers