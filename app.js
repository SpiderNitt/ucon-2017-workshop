var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('random_function.html');
});

app.get('/app',function(req, res){
  res.sendfile('app.html');
});


//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('clientEvent', function(data){
  		socket.broadcast.emit('serverEvent',data);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

io.on('connect',function(socket){
	console.log("Attempted connect");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});