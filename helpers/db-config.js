var mongoose = require('mongoose');

var init_db = function(mongo_path){
  mongoose.connect(mongo_path);
  return mongoose.connection;
};

module.exports = function(mongo_path){
  var db = init_db(mongo_path);
  db.on('error', function(err){
    console.log('error connecting to db', err);
  });
  db.once('open', function(){
    console.log('connected to DB');
  });
  return db;
};