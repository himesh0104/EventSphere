# EventSphere — Discover. Chat. Connect.

A unified full-stack web app that combines:
- Mini Event Finder (CRUD + REST)
- Real-Time Chat (Socket.IO)
- Location-Based Event Discovery (Leaflet + geospatial filtering)
- Mini Authentication System (JWT + bcrypt)

## Tech Stack
- Frontend: React (Vite) + Tailwind + react-router + react-hot-toast + react-leaflet
- Backend: Node.js + Express + MongoDB (Mongoose) + Socket.IO
- Auth: JWT + bcrypt

## Monorepo Structure
```
/event-sphere
  backend/
    src/
      modules/{auth,events,chat}
      middleware/
      utils/
      server.js
      socket.js
    package.json
    .env.example
  frontend/
    src/
      pages/
      components/
      context/
      lib/
    package.json
    vite.config.js
    .env.example
```

## Local Development

1) Backend
- Copy `.env.example` to `.env` and adjust values
- Install deps and run dev server
```
cd backend
npm install
npm run dev
```
API runs at `http://localhost:5000`

2) Frontend
- Copy `.env.example` to `.env` and adjust values if needed
- Install deps and run dev server
```
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`

## REST API (high-level)
- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - GET  /api/auth/me (protected)
- Events
  - GET  /api/events?q=&page=&limit=
  - GET  /api/events/:id
  - POST /api/events (protected)
  - PUT  /api/events/:id (protected)
  - DELETE /api/events/:id (protected)
  - GET  /api/events/nearby?lat=&lng=&radius=
- Chat
  - GET  /api/chat/rooms/:room/messages (last 20 in-memory)

## WebSocket Events
- join_room (room)
- send_message ({ room, user, text })
- typing ({ room, user })
- Broadcasts: `new_message`, `typing`

## Notes
- Geospatial search uses MongoDB 2dsphere index; ensure MongoDB is running locally
- Basic CORS is configured to allow `CLIENT_URL` (defaults to Vite dev URL)
- This is a starter; validation, rate limits, and production hardening can be added later

## Deployment (Overview)
- Frontend: Deploy `frontend/` to Vercel as a static Vite app
- Backend: Deploy `backend/` to a Node host with WebSocket support (Render/Railway/Fly). Vercel supports WebSockets but requires specific configuration; you can also use a dedicated host for simplicity. Set env vars appropriately and point `VITE_API_URL` and `VITE_WS_URL` to the backend URL.
