import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './utils/db.js';
import authRoutes from './modules/auth/routes.js';
import eventRoutes from './modules/events/routes.js';
import chatRoutes from './modules/chat/routes.js';

const app = express();
const server = http.createServer(app);

// Config
const PORT = process.env.PORT || 4000;
const RAW_CLIENT_URL = process.env.CLIENT_URL || 'https://event-sphere11.vercel.app';
let CLIENT_URL = RAW_CLIENT_URL;
try {
  const u = new URL(RAW_CLIENT_URL);
  CLIENT_URL = u.origin;
} catch {
  CLIENT_URL = RAW_CLIENT_URL.replace(/\/$/, '');
}
const ADDITIONAL_ORIGINS = (process.env.CORS_EXTRA_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const ALLOWED_ORIGINS = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  ...ADDITIONAL_ORIGINS,
].filter(Boolean);

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Root info routes
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/', (req, res) => {
  const backendUrl = `${req.protocol}://${req.get('host')}`;
  const frontendUrl = `${CLIENT_URL.replace(/\/$/, '')}/events`;
  return res.json({
    service: 'EventSphere API',
    status: 'ok',
    frontend: frontendUrl,
    backend: backendUrl,
    endpoints: ['/health', '/api/health', '/api/auth', '/api/events', '/api/chat'],
  });
});
app.get('/api', (req, res) =>
  res.json({
    api: 'v1',
    status: 'ok',
    health: '/api/health',
  })
);

// Ensure DB connection for serverless environments before protected routes
const getMongoUri = () => process.env.MONGODB_URI || process.env.MONGO_URI;
const ensureDb = async (_req, _res, next) => {
  try {
    const uri = getMongoUri();
    if (!uri) return next();
    if (mongoose.connection.readyState !== 1) {
      await connectDB(uri);
    }
    return next();
  } catch (e) {
    console.error('DB connect failed', e);
    return next();
  }
};

// Routes
app.use(ensureDb);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chat', chatRoutes);

// Not found
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start
const start = async () => {
  try {
    // Attempt DB connect if URI present; do not crash if absent in serverless env
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (uri) {
      await connectDB(uri);
    }
    // Only start Socket.IO and listen when running as a long-lived server (not on Vercel serverless)
    if (!process.env.VERCEL) {
      const { initSocket } = await import('./socket.js');
      initSocket(server, ALLOWED_ORIGINS);
      server.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
    }
  } catch (e) {
    console.error('Failed to start server', e);
    // Do not exit; allow serverless handler to still respond to health and simple routes
  }
};

// In local/dev, start the HTTP server. On Vercel, export the app for @vercel/node.
if (!process.env.VERCEL) {
  start();
}

export default app;

