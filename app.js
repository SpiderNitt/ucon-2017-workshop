var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/app',function(req, res){
  res.sendfile('app.html');
});

var set_lane = 0;
var dir = "null";
//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('clientEvent', function(data){
  	if(data < -5 && set_lane == 0){
	  	dir = "right";
	  	set_lane = 1;
	  	console.log(dir)
	  	socket.broadcast.emit('serverEvent',dir);
  	}
	if(data > 5 && set_lane == 0){
		dir = "left";
		set_lane = 1;
		console.log(dir);
		socket.broadcast.emit('serverEvent',dir);
	}
	if(data < 1 && data > -1){
		set_lane = 0;

	}

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