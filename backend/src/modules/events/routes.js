import { Router } from 'express';
import { authRequired } from '../../middleware/auth.js';
import {
  createEvent,
  deleteEvent,
  getEvent,
  listEvents,
  nearbyEvents,
  updateEvent,
} from './controller.js';

const router = Router();

// public list and details
router.get('/', listEvents);
router.get('/nearby', nearbyEvents);
router.get('/:id', getEvent);

// protected create/update/delete
router.post('/', authRequired, createEvent);
router.put('/:id', authRequired, updateEvent);
router.delete('/:id', authRequired, deleteEvent);

// quick seed for demos (not secure; dev only)
router.post('/seed/dev', async (req, res) => {
  try {
    const sample = [
      { title: 'Tech Meetup', locationName: 'San Francisco', lat: 37.7749, lng: -122.4194 },
      { title: 'Art Expo', locationName: 'New York', lat: 40.7128, lng: -74.006 },
      { title: 'Music Night', locationName: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
      { title: 'Startup Pitch', locationName: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { title: 'Food Fest', locationName: 'Delhi', lat: 28.6139, lng: 77.209 },
      { title: 'Book Club', locationName: 'London', lat: 51.5074, lng: -0.1278 },
      { title: 'Soccer Fans', locationName: 'Madrid', lat: 40.4168, lng: -3.7038 },
      { title: 'Coffee Lovers', locationName: 'Seattle', lat: 47.6062, lng: -122.3321 },
      { title: 'Design Jam', locationName: 'Berlin', lat: 52.52, lng: 13.405 },
      { title: 'Hiking Group', locationName: 'Zurich', lat: 47.3769, lng: 8.5417 }
    ];
    const created = [];
    for (const s of sample) {
      const body = {
        title: s.title,
        description: `${s.title} in ${s.locationName}`,
        date: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 30),
        maxParticipants: 50,
        locationName: s.locationName,
        lat: s.lat,
        lng: s.lng,
      };
      // fake req.user for dev seeding
      req.user = { id: null };
      const { createEvent } = await import('./controller.js');
      // not the best way but good for a quick seed 😅
      const ev = await (await import('./model.js')).Event.create({
        title: body.title,
        description: body.description,
        date: body.date,
        maxParticipants: body.maxParticipants,
        locationName: body.locationName,
        location: { type: 'Point', coordinates: [body.lng, body.lat] },
        createdBy: null,
      });
      created.push(ev);
    }
    res.json({ count: created.length });
  } catch (e) {
    res.status(500).json({ message: 'Seed failed', error: e.message });
  }
});

export default router;
