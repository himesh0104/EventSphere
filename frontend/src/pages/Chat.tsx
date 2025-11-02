import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Chat() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/events").then((res) => setEvents(res.data.items || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Event Chats</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((e) => (
            <div key={e.id} className="border rounded p-3 bg-white">
              <div className="font-semibold">{e.title}</div>
              <div className="text-xs text-gray-600">{new Date(e.date).toLocaleString()}</div>
              <Link to={`/events/${e.id}`} className="inline-block mt-2 text-blue-600 text-sm">Join Chat</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
