import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ChatWidget from "../components/ChatWidget";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);

  useEffect(() => {
    api.get(`/api/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  const username = localStorage.getItem("username") || "guest";

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded p-4">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <div className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</div>
        <p className="mt-2">{event.description}</p>
      </div>
      <ChatWidget roomId={event.id} username={username} />
    </div>
  );
}
