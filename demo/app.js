var express = require('express');
var app = express();
var port = 3030;
app.get("/username/:id", function(req, res) {
  res.type('text/plain');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  var foo = req.params.id
  if (foo.length > 3){
    res.send("true");
  } else {
    res.send("false");
  }
});

function tick() {
  var now = new Date().toUTCString();
  io.sockets.emit('message', {message: now});
}

var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket){
  socket.emit('message', { message: 'welcome to FRP Demo' });
  socket.on('send', function(data) {
    data.message = data.message + 'foo';
    io.sockets.emit('message', data);
  });
});

setInterval(tick, 10000);

console.log('Listening on port ' + port);
