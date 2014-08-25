var server = require('./server-conf');

server.app.listen(server.port);
console.log('Gateway server listening on port', server.port);