const express = require('express');
const path = require('path');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const colorStack = ["blue", "red", "green", "yellow"]; // Stack of available colors
const playerColors = {}; // Map socket.id -> color

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve all static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Assign color if available
  if (colorStack.length > 0) {
    const assignedColor = colorStack.pop(); // Take top color
    playerColors[socket.id] = assignedColor; // Store mapping

    // Send assigned color to that user only
    io.emit('assignColor', playerColors);

    console.log(`Assigned ${assignedColor} to ${socket.id}`);
  } else {
    socket.emit('assignColor', { id: socket.id, color: null }); // No colors left
    console.log(`No colors left for ${socket.id}`);
  }

  // Handle goti moves
  socket.on('gotiMoved', (moveData) => {
    io.emit('gotiMoved', moveData);
  });


  // On disconnect, return the color to stack
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    if (playerColors[socket.id]) {
      colorStack.push(playerColors[socket.id]); // Put color back on stack
      delete playerColors[socket.id]; // Remove mapping
    }

    console.log('Available colors:', colorStack);
  });
});



server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
