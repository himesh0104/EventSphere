import { Server } from 'socket.io';
import { addMessage, getMessages } from './modules/chat/store.js';

export const initSocket = (httpServer, corsOrigin) => {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, credentials: true },
  });

  io.on('connection', (socket) => {
    // Join a room (event chat). Accept either string room or object { room, user }
    socket.on('join_room', (payload) => {
      const room = typeof payload === 'string' ? payload : payload?.room || payload?.roomId;
      const user = typeof payload === 'string' ? undefined : payload?.user || payload?.username;
      if (!room) return;
      socket.join(room);
      socket.to(room).emit('user_joined', { id: socket.id, user });
      // send recent history to the joining client
      const hist = (getMessages(room) || []).map((m) => ({
        username: m.username || m.user || 'anon',
        text: m.text,
        timestamp: m.timestamp || m.time || Date.now(),
      }));
      socket.emit('history', hist);
    });

    socket.on('typing', ({ room, user }) => {
      if (!room) return;
      socket.to(room).emit('typing', { user });
    });

    socket.on('send_message', (payload) => {
      const room = payload?.room || payload?.roomId;
      const user = payload?.user || payload?.username || 'anon';
      const text = payload?.text;
      if (!room || !text) return;
      const message = { username: user, text, timestamp: Date.now() };
      addMessage(room, message);
      io.to(room).emit('new_message', message);
    });

    socket.on('disconnect', () => {
      // TODO: maybe broadcast presence later
    });
  });

  return io;
};

