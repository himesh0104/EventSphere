import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './utils/db.js';
import authRoutes from './modules/auth/routes.js';
import eventRoutes from './modules/events/routes.js';
import chatRoutes from './modules/chat/routes.js';

const app = express();
const server = http.createServer(app);

// Config
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'https://event-sphere11.vercel.app';

// Middlewares
app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);

// Not found
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI || process.env.MONGO_URI);
    const { initSocket } = await import('./socket.js');
    initSocket(server, CLIENT_URL);
    server.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
};

start();

