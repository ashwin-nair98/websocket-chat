var express = require('express');
var socket = require('socket.io');

//Server setup
var app = express();
var server = app.listen(4000, function(){
  console.log("Listening to requests on http://localhost:4000");
});

//Serve Static pages
app.use(express.static('public'));
//Socket.io listens on 'server'
var io = socket(server);
//When connection is made, fire callback function
io.on('connection', function(socket){
  console.log("Socket connection made. ID: ", socket.id);
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  })
});
