import { useEffect, useState } from "react";
import api from "../services/api";
import EventList from "../components/EventList";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    const url = search ? `/api/events?q=${encodeURIComponent(search)}` : "/api/events";
    const res = await api.get(url);
    setEvents(res.data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Discover memorable events near you</h1>
        <p className="text-sm text-gray-600">Search by title or location to find what’s happening around you.</p>
      </div>
      <div className="flex gap-2 max-w-2xl mx-auto w-full">
        <input className="border border-black/10 px-3 py-2 rounded-full flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Search events" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="rounded-full bg-blue-600 text-white px-5 py-2 shadow-sm hover:bg-blue-700" onClick={load}>Search</button>
      </div>
      {loading ? (
        <div className="text-center text-sm text-gray-500">Loading events…</div>
      ) : (
        <div className="mt-2"><EventList events={events} /></div>
      )}
    </div>
  );
}

