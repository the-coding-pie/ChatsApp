const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));

const server = app.listen(3000, () => console.log('Connected!'));

// socket server -> connect it to our server
const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (data) => {
    // broadcast
    io.sockets.emit('message', data);
  });

  socket.on('typing', (data) => {
    // broadcast
    socket.broadcast.emit('typing', data);
  })
});