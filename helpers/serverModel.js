var mongoose = require('mongoose');

var serverSchema = mongoose.Schema({
  port: Number,
  name: String,
  auth_server: String,
  token: String,
  status: {
    type:String, 
    default:'offline'
  }
});

serverSchema.pre('save', function(next){
  this.url = this.base+this.port;
  next();
});

var Server = mongoose.model('Server', serverSchema);
module.exports= Server;