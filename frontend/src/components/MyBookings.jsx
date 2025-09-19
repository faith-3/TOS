import React, { useEffect, useState } from "react";
import { api, endpoints } from "../lib/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get(endpoints.bookings.list);
        setBookings(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const current = bookings.filter(b => b.status === "Pending" || b.status === "Scheduled");
  const past = bookings.filter(b => b.status === "Completed" || b.status === "Cancelled");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">My Bookings</h1>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <h2 className="text-xl font-semibold mb-4 text-blue-800">Current Bookings</h2>
        {current.length === 0 ? (
          <p className="mb-6 text-gray-600">No current bookings.</p>
        ) : (
          <ul className="mb-6 space-y-3">
            {current.map(b => (
              <li key={b.id} className="border border-blue-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-blue-900">{b.pickup} → {b.dropoff}</p>
                    <p className="text-sm text-gray-600">When: {new Date(b.when).toLocaleString()}</p>
                    {b.notes && <p className="text-sm text-gray-600">Notes: {b.notes}</p>}
                  </div>
                  <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{b.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mb-4 text-blue-800">Past Bookings</h2>
        {past.length === 0 ? (
          <p className="text-gray-600">No past bookings.</p>
        ) : (
          <ul className="space-y-3">
            {past.map(b => (
              <li key={b.id} className="border border-blue-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-blue-900">{b.pickup} → {b.dropoff}</p>
                    <p className="text-sm text-gray-600">When: {new Date(b.when).toLocaleString()}</p>
                    {b.notes && <p className="text-sm text-gray-600">Notes: {b.notes}</p>}
                  </div>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">{b.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
