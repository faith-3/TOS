import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, endpoints } from "../lib/api";

function BookDriver() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectDriverId = searchParams.get('driverId') || '';
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(preselectDriverId || "");

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams();
        if (pickup) params.set('location', pickup);
        // First try same-location drivers
        let list = await api.get(`${endpoints.drivers.list}${params.toString() ? `?${params.toString()}` : ''}`);
        if (!Array.isArray(list)) list = [];
        // If none, fallback to available drivers
        if (list.length === 0) {
          const availableList = await api.get(`${endpoints.drivers.list}?available=true`);
          if (Array.isArray(availableList)) list = availableList;
        }
        // Sort: available first already, then by distanceKm if present
        list.sort((a,b)=> (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
        setDrivers(list);
      } catch {}
    })();
  }, [pickup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!pickup || !dropoff || !when) {
      setError("Please fill in pickup, dropoff, and time.");
      return;
    }

    setLoading(true);
    try {
      const driverIdToUse = selectedDriverId || preselectDriverId || undefined;
      await api.post(endpoints.bookings.create, { pickup, dropoff, when, notes, driverId: driverIdToUse });
      setSuccess("Driver request submitted! Redirecting to My Bookings...");
      setTimeout(() => navigate("/my-bookings"), 700);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Book a Driver</h1>
      <form onSubmit={handleSubmit} className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-2xl flex flex-col gap-4">
        {(preselectDriverId || selectedDriverId) && <div className="text-sm text-blue-900">Booking with selected driver</div>}
        <input value={pickup} onChange={(e) => setPickup(e.target.value)} type="text" placeholder="Pickup Location" className="p-3 rounded border border-gray-300" required />
        <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} type="text" placeholder="Dropoff Location" className="p-3 rounded border border-gray-300" required />
        <input value={when} onChange={(e) => setWhen(e.target.value)} type="datetime-local" className="p-3 rounded border border-gray-300" required />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Special Notes (optional)" className="p-3 rounded border border-gray-300" rows={3}></textarea>
        {/* Driver discovery */}
        <div>
          <h3 className="text-blue-900 font-semibold mb-2">Suggested Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {drivers.map(d => (
              <label key={d.id} className={`bg-white rounded-lg border p-3 flex items-start gap-3 cursor-pointer ${selectedDriverId === d.id ? 'border-orange-500' : 'border-gray-200'}`}>
                <input type="radio" name="driver" value={d.id} checked={selectedDriverId === d.id} onChange={() => setSelectedDriverId(d.id)} className="mt-1" />
                <div>
                  <div className="font-semibold text-blue-900">{d.name}</div>
                  {d.location && <div className="text-sm text-gray-600">Location: {d.location}</div>}
                  <div className="text-sm text-gray-600">Rating: {d.rating?.toFixed?.(1) ?? d.rating ?? 0}</div>
                </div>
              </label>
            ))}
            {drivers.length === 0 && <div className="text-gray-600">No drivers in this location yet. You can still submit and we will match a nearby driver.</div>}
          </div>
        </div>
        {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
        {success && <div className="p-3 rounded bg-green-100 text-green-700">{success}</div>}
        <button disabled={loading} type="submit" className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">{loading ? 'Submitting...' : 'Request Driver'}</button>
      </form>
    </div>
  );
}

export default BookDriver;
