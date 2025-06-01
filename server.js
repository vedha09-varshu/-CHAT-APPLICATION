const users = {};
const mongoose = require('mongoose');
const Message = require('./models/Message');

mongoose.connect('mongodb://localhost:27017/chatterbox', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Store users and messages per room
const rooms = {};  // { roomName: { users: {}, messages: [] } }

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // When a user joins a room
  socket.on('join room', ({ username, room }) => {
    socket.join(room);

    // Initialize room if it doesn't exist
    if (!rooms[room]) {
      rooms[room] = { users: {}, messages: [] };
    }

    // Add user to room
    rooms[room].users[socket.id] = username;

    // Send existing messages to the user who joined
    socket.emit('load messages', rooms[room].messages);

    // Notify others in the room
    io.to(room).emit('user list', Object.values(rooms[room].users));
    io.to(room).emit('chat message', { user: 'System', text: `${username} joined the room`, time: '' });

    // Save system message
    rooms[room].messages.push({ user: 'System', text: `${username} joined the room`, time: '' });
  });

  // When a chat message is sent
  socket.on('chat message', ({ user, text, room, time }) => {
    const message = { user, text, time };
    if (rooms[room]) {
      rooms[room].messages.push(message);
      io.to(room).emit('chat message', message);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    // Remove user from all rooms they are in
    for (const room in rooms) {
      if (rooms[room].users[socket.id]) {
        const username = rooms[room].users[socket.id];
        delete rooms[room].users[socket.id];

        io.to(room).emit('user list', Object.values(rooms[room].users));
        io.to(room).emit('chat message', { user: 'System', text: `${username} left the room`, time: '' });

        rooms[room].messages.push({ user: 'System', text: `${username} left the room`, time: '' });
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ChatterBox Pro running on http://localhost:${PORT}`);
});
