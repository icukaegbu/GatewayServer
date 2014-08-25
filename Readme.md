### Gateway server

#### Scope:
  A gateway server that provides routing for a group of other servers

#### Tasks it completes:
1 Serves as entry point to service
2 Manages connections
3 Performs routes to authentication services
4 Checks that servers are up and running
5 New servers register with this server when they spin up

#### Stack:
1 MongoDB to store server info
2 Express
3 Socket.io