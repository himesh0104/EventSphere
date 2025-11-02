import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function ChatWidget({ roomId, username }: { roomId: string; username: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const env = (import.meta as any).env || {};
    const SOCKET_URL = env.VITE_SOCKET_URL || env.VITE_API_BASE_URL || "https://event-sphere-plum.vercel.app";
    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join_room", { room: roomId, user: username });
    });

    socket.on("history", (hist: any[]) => setMessages(hist));
    socket.on("new_message", (msg: any) => setMessages((m) => [...m, msg]));
    socket.on("typing", ({ user }: any) => {
      setTypingUser(user || null);
      setTimeout(() => setTypingUser(null), 1500);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    socketRef.current?.emit("send_message", { room: roomId, text, user: username });
    setText("");
  }

  function onTyping(val: string) {
    setText(val);
    socketRef.current?.emit("typing", { room: roomId, user: username });
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="px-4 py-2 border-b border-black/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <div className="text-sm font-medium">Live Chat</div>
        <div className="ml-auto text-xs text-gray-500">Room: {roomId.slice(0, 6)}…</div>
      </div>
      <div ref={listRef} className="h-56 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((m) => {
          const mine = (m.username || "") === username;
          return (
            <div key={m.timestamp + (m.username || "") + (m.text || "")} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${mine ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`}>
                <div className="text-[10px] opacity-75 mb-0.5">{mine ? 'You' : m.username}</div>
                <div>{m.text}</div>
                <div className={`text-[10px] mt-1 ${mine ? 'text-white/80' : 'text-gray-500'}`}>{new Date(m.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          );
        })}
        {typingUser && <div className="text-xs text-gray-500">{typingUser} is typing…</div>}
      </div>
      <div className="p-3 border-t border-black/5">
        <div className="flex items-center gap-2">
          <input className="border border-black/10 rounded-full flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40" value={text} onChange={(e) => onTyping(e.target.value)} placeholder="Type a message" />
          <button className="inline-flex items-center gap-1 rounded-full bg-blue-600 text-white px-4 py-2 shadow-sm hover:bg-blue-700" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}

