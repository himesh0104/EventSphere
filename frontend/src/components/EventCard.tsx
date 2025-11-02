import { Link } from "react-router-dom";

export default function EventCard({ event }: { event: any }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow p-5 relative">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base md:text-lg text-gray-900 tracking-tight">{event.title}</h3>
          <div className="text-xs text-gray-500 mt-1">{new Date(event.date).toLocaleString()}</div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.description}</p>
        </div>
        {event.distanceKm !== undefined && (
          <span className="shrink-0 inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-medium">{event.distanceKm.toFixed(1)} km</span>
        )}
      </div>
      <div className="mt-4">
        <Link to={`/events/${event.id}`} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
          View details
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </Link>
      </div>
    </div>
  );
}
