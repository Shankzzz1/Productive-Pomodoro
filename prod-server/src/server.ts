// src/server.ts
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';
// import { setupSocket } from './socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update in production
    methods: ['GET', 'POST']
  }
});

// Initialize DB and sockets
connectDB();
// setupSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
