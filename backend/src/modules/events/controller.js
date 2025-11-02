import mongoose from 'mongoose';
import { Event } from './model.js';

// simple pagination helper
const parsePage = (v, d) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) || n < 1 ? d : n;
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, maxParticipants, locationName, lat, lng } = req.body;
    if (!title || !date) return res.status(400).json({ message: 'title and date are required' });
    const event = await Event.create({
      title,
      description: description || '',
      date: new Date(date),
      maxParticipants: maxParticipants ?? 50,
      locationName: locationName || '',
      location: { type: 'Point', coordinates: [Number(lng) || 0, Number(lat) || 0] },
      createdBy: req.user?.id || null,
    });
    res.status(201).json(event);
  } catch (e) {
    res.status(500).json({ message: 'Create event failed', error: e.message });
  }
};

export const listEvents = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parsePage(req.query.page, 1);
    const limit = parsePage(req.query.limit, 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { locationName: { $regex: q, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Event.find(filter).sort({ date: 1 }).skip(skip).limit(limit),
      Event.countDocuments(filter),
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ message: 'List events failed', error: e.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const ev = await Event.findById(id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json(ev);
  } catch (e) {
    res.status(500).json({ message: 'Get event failed', error: e.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.lat !== undefined || data.lng !== undefined) {
      const lat = Number(data.lat) || 0;
      const lng = Number(data.lng) || 0;
      data.location = { type: 'Point', coordinates: [lng, lat] };
      delete data.lat; delete data.lng;
    }
    if (data.date) data.date = new Date(data.date);

    const ev = await Event.findByIdAndUpdate(id, data, { new: true });
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json(ev);
  } catch (e) {
    res.status(500).json({ message: 'Update event failed', error: e.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const ev = await Event.findByIdAndDelete(id);
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Delete event failed', error: e.message });
  }
};

export const nearbyEvents = async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radiusKm = Number(req.query.radius) || 10; // km
    if (Number.isNaN(lat) || Number.isNaN(lng))
      return res.status(400).json({ message: 'lat and lng are required' });

    const meters = radiusKm * 1000;
    const items = await Event.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: meters,
        },
      },
    }).limit(100);

    res.json({ items });
  } catch (e) {
    res.status(500).json({ message: 'Nearby search failed', error: e.message });
  }
};
