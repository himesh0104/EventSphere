// super tiny in-memory store for last 20 messages per room
// Not the best way, but works for now!
const rooms = new Map(); // room -> [{ user, text, time }]

export const addMessage = (room, msg) => {
  const arr = rooms.get(room) || [];
  arr.push(msg);
  while (arr.length > 20) arr.shift();
  rooms.set(room, arr);
};

export const getMessages = (room) => {
  return rooms.get(room) || [];
};
