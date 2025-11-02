import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/auth/me").then((res) => setUser(res.data.user));
    api.get("/api/events").then((res) => setEvents(res.data.items || res.data || []));
  }, []);

  if (!user) return <div>Loading...</div>;

  const myEvents = events.filter((e) => {
    const createdBy = e.createdBy;
    const id = typeof createdBy === "string" ? createdBy : createdBy?.id || createdBy?._id;
    return id && user?.id && id.toString() === user.id.toString();
  }).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
        <div className="text-sm text-gray-600">{user.email}</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your recent events</h3>
            <Link to="/create" className="text-blue-600 text-sm">Create new</Link>
          </div>
          {myEvents.length === 0 ? (
            <div className="text-sm text-gray-600">No events created yet.</div>
          ) : (
            <ul className="space-y-2">
              {myEvents.map((e) => (
                <li key={e.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{e.title}</div>
                    <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()}</div>
                  </div>
                  <Link to={`/events/${e.id}`} className="text-blue-600 text-sm">View</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">Quick actions</h3>
          <div className="flex flex-wrap gap-2">
            <Link to="/create" className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm">Create event</Link>
            <Link to="/map" className="rounded-full bg-gray-900 text-white px-4 py-2 text-sm">Open map</Link>
            <Link to="/events" className="rounded-full bg-white border border-black/10 px-4 py-2 text-sm">Browse events</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
