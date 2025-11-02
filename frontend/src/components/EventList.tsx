import EventCard from "./EventCard";

export default function EventList({ events }: { events: any[] }) {
  if (!events.length) return <div>No events found.</div>;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  );
}
