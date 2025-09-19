import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, endpoints } from "../lib/api";
import { AuthContext } from "../context/AuthContext";

function DriverRegister() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [location, setLocation] = useState("");
  const [available, setAvailable] = useState(false);
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('driverId');
      if (existing) setAlreadyRegistered(true);
    } catch {}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name) { setError("Name is required"); return; }
    setLoading(true);
    try {
      const created = await api.post(endpoints.drivers.list, {
        name,
        location: location || null,
        available,
        rating: rating ? Number(rating) : undefined,
        userId: user?.id,
      });
      if (created?.id) {
        localStorage.setItem('driverId', created.id);
      }
      setSuccess("Driver profile created! Redirecting to dashboard...");
      setTimeout(()=> navigate('/driver'), 800);
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Register as a Driver</h1>
      {alreadyRegistered && (
        <div className="w-full max-w-lg mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
          You appear to be already registered as a driver. You can re-register to update your profile.
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-lg flex flex-col gap-4">
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name" className="p-3 rounded border border-gray-300" required />
        <input value={location} onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Usual location (e.g., Kigali - Kicukiro)" className="p-3 rounded border border-gray-300" />
        <label className="flex items-center gap-2 text-blue-900">
          <input type="checkbox" checked={available} onChange={(e)=>setAvailable(e.target.checked)} />
          I am currently available for bookings
        </label>
        <input value={rating} onChange={(e)=>setRating(e.target.value)} type="number" min="0" max="5" step="0.1" placeholder="Initial rating (optional)" className="p-3 rounded border border-gray-300" />
        {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
        {success && <div className="p-3 rounded bg-green-100 text-green-700">{success}</div>}
        <button disabled={loading} type="submit" className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">{loading ? 'Submitting...' : 'Create Driver Profile'}</button>
      </form>
    </div>
  );
}

export default DriverRegister;
