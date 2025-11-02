import { Router } from 'express';
import { getMessages } from './store.js';

const router = Router();

// fetch last messages for a room (no auth to keep demo simple)
router.get('/rooms/:room/messages', (req, res) => {
  const { room } = req.params;
  const messages = getMessages(room);
  res.json({ room, messages });
});

export default router;
