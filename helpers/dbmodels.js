var mongoose = require('mongoose');

var serverSchema = mongoose.Schema({
  info: String,
  name:String
});


var Server = mongoose.model('Server', serverSchema);
module.exports.Server = Server;

var allowedSchema = mongoose.Schema({
  name: {
    type:String, 
    index:{
      unique:true
    }
  },
  identity: { type:String, required:true} 
});

var Allowed = mongoose.model('Allowed', allowedSchema);
module.exports.Allowed = Allowed;

var secrSchema = mongoose.Schema({
  name: String,
  address: String,
  token: {type:String, required:true, index: {unique:true}}
});

var Secrets = mongoose.model('Secret', secrSchema);

module.exports.Sec = Secrets;