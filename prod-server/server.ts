// server.ts (or index.ts if you prefer)
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with frontend URL in production
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Socket logic
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('JOIN_ROOM', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
    io.to(roomId).emit('USER_JOINED', socket.id);
  });

  socket.on('TIMER_START', ({ roomId, duration, type }) => {
    io.to(roomId).emit('TIMER_STARTED', { duration, type, startedAt: Date.now() });
  });

  socket.on('TIMER_PAUSE', (roomId) => {
    io.to(roomId).emit('TIMER_PAUSED');
  });

  socket.on('TIMER_TICK', ({ roomId, remaining }) => {
    io.to(roomId).emit('TIMER_UPDATED', remaining);
  });

  socket.on('EMOJI_SEND', ({ roomId, emoji, username }) => {
    io.to(roomId).emit('EMOJI_RECEIVE', { emoji, username, time: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Optional: broadcast user left
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
