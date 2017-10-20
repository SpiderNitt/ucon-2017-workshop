
/*
Require dependencies
*/

var express = require('express'); //express is used for a webframework
var app = require('express')(); //creates a new instance of express 
var http = require('http').Server(app); //http package is used HTTP server
var io = require('socket.io')(http); //socket.io package for creating socket connections

app.use(express.static('public')); 



/*
Writing a route
*/

// when client requests a '/' from the browser, we serve 'game.html'
app.get('/', function(req, res){
  res.sendfile('game.html');
});



/*
Writing the socket funtions
*/

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  //Whenever 'clientEvent' occurs this gets executed
  socket.on('clientEvent', function(data){

      //The data from clientEvent is sent as 'serverEvent' to whoever listens to 'serverEvent'
  		socket.broadcast.emit('serverEvent',data);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

//Whenever someone attemtps to connect, this gets executed
io.on('connect',function(socket){
	console.log("Attempted connect");
});


//Finally, we set the server to listen on port - 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
