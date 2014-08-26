//A file for available ports and other env specific tasks

var mongo = process.env.MONGO_PATH || 'mongodb://localhost/gateway';
var gateway_port = process.env.PORT || 27007;

module.exports = {
  mongo: mongo,
  port: gateway_port
};