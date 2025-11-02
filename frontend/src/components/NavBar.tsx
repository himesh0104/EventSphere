import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-white/30">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-lg">EventSphere</Link>
        <div className="flex items-center gap-1">
          <Link to="/events" className="px-3 py-1.5 text-sm rounded-full hover:bg-black/5">Home</Link>
          <Link to="/map" className="px-3 py-1.5 text-sm rounded-full hover:bg-black/5">Map</Link>
          <Link to="/chat" className="px-3 py-1.5 text-sm rounded-full hover:bg-black/5">Chat</Link>
          {token && (
            <Link to="/create" className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">Create</Link>
          )}
          <Link to="/dashboard" className="px-3 py-1.5 text-sm rounded-full hover:bg-black/5">Dashboard</Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!token ? (
            <>
              <Link to="/login" className="px-3 py-1.5 text-sm rounded-full hover:bg-black/5">Login</Link>
              <Link to="/register" className="px-3 py-1.5 text-sm rounded-full bg-black text-white">Sign up</Link>
            </>
          ) : (
            <button
              className="px-3 py-1.5 text-sm rounded-full bg-red-50 text-red-600 hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                location.reload();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

