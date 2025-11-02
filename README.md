# EventSphere — Full-Stack Event Discovery Platform

Minimal working product with Auth, Events CRUD (create/list/detail), Nearby search, Map view (Leaflet), and real-time chat per event via Socket.IO.

## Features
- **JWT Auth**: register, login, me
- **Events API**: list, detail, create (protected), search, nearby (Haversine)
- **Real-time Chat**: per-event rooms, last 20 messages persisted in memory
- **Map View**: Leaflet + OSM tiles, radius filter, current location
- **Toggle storage**: In-memory by default; set MONGO_URI to enable Mongo (adapters placeholder-ready)

## Monorepo Structure
- **/backend** Node + Express + TypeScript
- **/frontend** React + TypeScript + Vite + Tailwind

## Quickstart (Local)
1. Copy envs
   - Backend: `cp backend/.env.example backend/.env` (on Windows: create `.env` from example)
   - Frontend: `cp frontend/.env.example frontend/.env`
2. Install deps at root
   - `npm install` (installs root dev tool only)
   - `npm --prefix backend install`
   - `npm --prefix frontend install`
3. Seed events (optional)
   - `npm --prefix backend run seed`
4. Run both apps
   - `npm run dev` (root) → frontend at http://localhost:5173, backend at http://localhost:4000

## Environment Variables
- Backend (.env)
  - PORT=4000
  - JWT_SECRET=replace-with-strong-secret
  - MONGO_URI=
  - FRONTEND_URL=http://localhost:5173
- Frontend (.env)
  - VITE_BACKEND_URL=http://localhost:4000
  - VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

## API Summary
- POST /api/auth/register { name, email, password } → { user, token }
- POST /api/auth/login { email, password } → { user, token }
- GET /api/auth/me (Bearer token) → { user }
- GET /api/events [?location=lat,lng&radiusKm=N | ?search=text] → Event[]
- POST /api/events (Bearer) { title, description, location:{lat,lng}, date, maxParticipants } → Event
- GET /api/events/:id → Event
- GET /api/events/nearby?lat=..&lng=..&radiusKm=.. → Event[] with distanceKm

### Realtime (Socket.IO)
- join_room { roomId, username }
- send_message { roomId, text, username }
- typing roomId
- Server emits: history, new_message, typing, system

## cURL Examples
- Register: `curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{"name":"A","email":"a@a.com","password":"pass"}'`
- Login: `curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"pass"}'`
- Me: `curl -H "Authorization: Bearer TOKEN" http://localhost:4000/api/auth/me`
- Create event: `curl -X POST http://localhost:4000/api/events -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"title":"Test","description":"Desc","location":{"lat":18.5,"lng":73.8},"date":"2025-01-01T10:00","maxParticipants":50}'`
- Nearby: `curl "http://localhost:4000/api/events/nearby?lat=18.5&lng=73.8&radiusKm=20"`

## Deployment
- Frontend (Vercel)
  - Set env VITE_BACKEND_URL to deployed backend URL
  - Build Command: `npm --prefix frontend run build`
  - Output Dir: `frontend/dist`
- Backend (Render/Railway)
  - Node runtime, `npm --prefix backend run build && npm --prefix backend start`
  - Env: PORT, JWT_SECRET, FRONTEND_URL (Vercel URL), MONGO_URI (optional)
  - Make sure Socket.IO CORS origin matches FRONTEND_URL

## Decisions & Notes
- Simple in-memory stores for users, events, and chat; Mongo-ready by switching to adapters
- Tailwind for minimal UI; no heavy components
- Keep endpoints small and predictable

## Challenges
- Ensuring Socket.IO and CORS across local + deployed origins
- Leaflet in Vite with TypeScript; fixed via types and OSM tile config

## AI Tools Used
- Cascade assistant to scaffold code quickly, ensure API spec compliance

## Demo Checklist (Screenshots/Loom)
- Register → Login → Dashboard
- Home listing with search
- Create Event then view detail
- Map with markers and nearby filter
- Chat in an event room with timestamps

## Sample Commit History
- feat: scaffold backend + types
- feat: add auth register/login + JWT
- feat: add events endpoints + seed
- feat: scaffold frontend + auth flow
- feat: implement map view + chat widget
- chore: README & deployment

## Smoke Test Checklist
- Backend starts and GET /api/events returns array
- Register, Login, then GET /api/auth/me returns user
- Create event, GET /api/events includes new event
- Socket.IO: two browser tabs join same event and messages broadcast
- MapView shows seeded events; nearby filter returns subset
