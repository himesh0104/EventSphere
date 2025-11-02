import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit() {
    setError("");
    try {
      const body = { title, description, date, maxParticipants, locationName, lat: Number(lat), lng: Number(lng) };
      const res = await api.post("/api/events", body);
      toast.success("Event created");
      navigate(`/events/${res.data.id}`);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to create event");
      toast.error(e?.response?.data?.message || "Failed to create event");
    }
  }

  function useMyLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  }

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Create Event</h2>
      {error && <div className="text-red-600 text-xs bg-red-50 border border-red-100 rounded px-3 py-2">{error}</div>}
      <div className="space-y-1">
        <label className="text-xs text-gray-700">Title</label>
        <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-gray-700">Description</label>
        <textarea className="border border-black/10 px-3 py-2 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="What is this event about?" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-gray-700">Date & time</label>
        <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-gray-700">Location name</label>
        <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="e.g. Central Park" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-gray-700">Latitude</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Latitude" type="number" value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-700">Longitude</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Longitude" type="number" value={lng} onChange={(e) => setLng(parseFloat(e.target.value))} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="rounded-full bg-gray-900 text-white px-4 py-2" onClick={useMyLocation}>Use my location</button>
        <div className="flex-1" />
        <div className="space-y-1 w-48">
          <label className="text-xs text-gray-700">Max participants</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Max" type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(parseInt(e.target.value))} />
        </div>
      </div>
      <div className="pt-2">
        <button className="rounded-full bg-blue-600 text-white px-6 py-2 shadow-sm hover:bg-blue-700" onClick={submit}>Create event</button>
      </div>
    </div>
  );
}

