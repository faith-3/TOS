import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api, endpoints } from "../lib/api";

function DriverDashboard() {
  const { user } = useContext(AuthContext);
  const storedDriverId = (() => { try { return localStorage.getItem('driverId') || null; } catch { return null; } })();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const driverId = storedDriverId || user?.id || '';
      const list = await api.get(`${endpoints.bookings.list}?driverId=${driverId}`);
      setBookings(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user?.id, storedDriverId]);

  // Simple debug view (comment out later)
  // console.log('DriverDashboard using driverId:', storedDriverId || user?.id);

  const pending = useMemo(() => bookings.filter(b => b.status === 'Pending'), [bookings]);
  const scheduled = useMemo(() => bookings.filter(b => b.status === 'Scheduled'), [bookings]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(endpoints.bookings.status(id), { status });
      await load();
    } catch (e) {
      alert(e.message || 'Failed to update');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Driver Dashboard</h1>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Pending Requests</h2>
          {pending.length === 0 ? <p className="text-gray-600">No pending requests.</p> : (
            <ul className="space-y-3">
              {pending.map(b => (
                <li key={b.id} className="bg-white rounded border border-blue-100 p-3">
                  <p className="font-semibold text-blue-900">{b.pickup} → {b.dropoff}</p>
                  <p className="text-sm text-gray-600">When: {new Date(b.when).toLocaleString()}</p>
                  {b.notes && <p className="text-sm text-gray-600">Notes: {b.notes}</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>updateStatus(b.id,'Scheduled')} className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded">Confirm</button>
                    <button onClick={()=>updateStatus(b.id,'Cancelled')} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Decline</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-blue-50 rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Scheduled</h2>
          {scheduled.length === 0 ? <p className="text-gray-600">No scheduled rides.</p> : (
            <ul className="space-y-3">
              {scheduled.map(b => (
                <li key={b.id} className="bg-white rounded border border-blue-100 p-3">
                  <p className="font-semibold text-blue-900">{b.pickup} → {b.dropoff}</p>
                  <p className="text-sm text-gray-600">When: {new Date(b.when).toLocaleString()}</p>
                  {b.notes && <p className="text-sm text-gray-600">Notes: {b.notes}</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>updateStatus(b.id,'Completed')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded">Complete</button>
                    <button onClick={()=>updateStatus(b.id,'Cancelled')} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded">Cancel</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
