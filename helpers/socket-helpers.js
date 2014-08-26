module.exports = function(env){
  var hio = {};
  hio.setup = function(socket){
    socket.on('connection', function(data){
      if(data.port === undefined){
        socket.emit('assign', {port:env.get()});
      }
    });
  };
  return hio;
};