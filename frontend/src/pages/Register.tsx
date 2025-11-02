import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit() {
    setError("");
    try {
      const res = await api.post("/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      toast.success("Account created");
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Register failed");
      toast.error(e?.response?.data?.message || "Register failed");
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
      <div className="space-y-1 text-center mb-4">
        <h2 className="text-xl font-semibold">Create your account</h2>
        <p className="text-xs text-gray-600">Join events and chat in real-time.</p>
      </div>
      {error && <div className="mb-3 text-red-600 text-xs bg-red-50 border border-red-100 rounded px-3 py-2">{error}</div>}
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-gray-700">Name</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-700">Email</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-700">Password</label>
          <input className="border border-black/10 px-3 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="rounded-full bg-blue-600 text-white px-5 py-2 w-full shadow-sm hover:bg-blue-700" onClick={submit}>Create account</button>
      </div>
      <div className="text-xs text-center mt-4">Have an account? <Link to="/login" className="text-blue-600">Login</Link></div>
    </div>
  );
}

