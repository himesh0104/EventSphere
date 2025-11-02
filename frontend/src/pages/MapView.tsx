import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import L from "leaflet";
import { toast } from "sonner";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState(10);

  useEffect(() => {
    if (!mapRef.current || map) return;
    const m = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    L.tileLayer(import.meta.env.VITE_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(m);
    setMap(m);
  }, [map]);

  useEffect(() => {
    api.get("/api/events").then((res) => setEvents(res.data.items || [])).catch(() => toast.error("Failed to load events"));
  }, []);

  useEffect(() => {
    if (!map) return;
    const layerGroup = L.layerGroup().addTo(map);
    events.forEach((e) => {
      const marker = L.marker([e.location.lat, e.location.lng]).addTo(layerGroup);
      const html = `
        <div style="font-family: ui-sans-serif, system-ui; min-width: 180px">
          <div style="font-weight:600; color:#111827;">${e.title}</div>
          <div style="font-size:12px; color:#6B7280;">${new Date(e.date).toLocaleString()}</div>
          <a href="/events/${e.id}" style="display:inline-block;margin-top:6px;color:#2563EB;">View details →</a>
        </div>`;
      marker.bindPopup(html, { closeButton: true, className: "event-popup" });
      marker.on("click", () => {
        window.location.href = `/events/${e.id}`;
      });
    });
    return () => {
      layerGroup.remove();
    };
  }, [map, events]);

  function locate() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setCoords(c);
      map?.setView([c.lat, c.lng], 12);
      try {
        const res = await api.get(`/api/events/nearby?lat=${c.lat}&lng=${c.lng}&radius=${radius}`);
        setEvents(res.data.items || []);
        toast.success("Showing nearby events");
      } catch {
        toast.error("Failed to load nearby events");
      }
    }, () => toast.error("Location access denied"));
  }

  async function filterNearby() {
    if (!coords) return;
    try {
      const res = await api.get(`/api/events/nearby?lat=${coords.lat}&lng=${coords.lng}&radius=${radius}`);
      setEvents(res.data.items || []);
    } catch {
      toast.error("Failed to load nearby events");
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-white border border-black/5 shadow-sm p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-gray-900 text-white px-4 py-2" onClick={locate}>Use my location</button>
          <button className="rounded-full bg-blue-600 text-white px-4 py-2 disabled:opacity-50" onClick={filterNearby} disabled={!coords}>Nearby</button>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-gray-600">Radius: {radius}km</span>
          <input className="flex-1 sm:w-48" type="range" min={1} max={50} value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} />
        </div>
      </div>
      <div id="map" ref={mapRef} className="w-full h-[500px] rounded-2xl border border-black/5 bg-white shadow-sm"></div>
    </div>
  );
}

