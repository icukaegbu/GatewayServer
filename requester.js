var request = require('request');
var data = {name:'http://www.google.com'};
var r = request({url:'http://localhost:27008/server', json:data, method:"GET"}, function(err, response, body){
  console.log(body);
});