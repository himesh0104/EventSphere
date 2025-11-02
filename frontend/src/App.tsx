import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as AppToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import NotFound from "./pages/NotFound";

// App (events) pages
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppToaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root */}
            <Route path="/" element={<Navigate to="/events" replace />} />

            {/* App (events) */}
            <Route
              path="/events"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <Home />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/chat"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <Chat />
                  </div>
                </div>
              }
            />
            <Route
              path="/events/:id"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <EventDetail />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen flex flex-col">
                    <NavBar />
                    <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                      <CreateEvent />
                    </div>
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <MapView />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <Login />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                    <Register />
                  </div>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen flex flex-col">
                    <NavBar />
                    <div className="container mx-auto p-4 flex-1 w-full max-w-5xl">
                      <Dashboard />
                    </div>
                    <Footer />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

