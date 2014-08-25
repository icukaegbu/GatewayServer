### Gateway server

#### Scope:
  A gateway server that provides routing for a group of other servers

#### Tasks it completes:
  1. Serves as entry point to service <br />
  2. Manages connections <br />
  3. Performs routes to authentication services <br />
  4. Checks that servers are up and running <br />
  5. New servers register with this server when they spin up <br />

#### Stack:
1. MongoDB to store server info <br />
2. Express <br />
3. Socket.io <br />
