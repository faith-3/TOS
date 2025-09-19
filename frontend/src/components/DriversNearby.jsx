import React, { useEffect, useMemo, useState } from "react";
import { api, endpoints } from "../lib/api";

function DriversNearby() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortNearest, setSortNearest] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await api.get(endpoints.drivers.list);
        setDrivers(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e.message || "Failed to load drivers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const shown = useMemo(() => {
    const arr = [...drivers];
    if (sortNearest) {
      arr.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    }
    return arr;
  }, [drivers, sortNearest]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Drivers</h1>
      <div className="w-full max-w-3xl mb-4 flex justify-end">
        <label className="flex items-center gap-2 text-blue-900">
          <input type="checkbox" checked={sortNearest} onChange={(e)=>setSortNearest(e.target.checked)} />
          Sort by nearest first
        </label>
      </div>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {shown.map(d => (
          <div key={d.id} className="bg-blue-50 rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold text-blue-900">{d.name}</h3>
            <p className="text-gray-700">Rating: {d.rating?.toFixed?.(1) ?? d.rating ?? 0}</p>
            {d.distanceKm != null && <p className="text-gray-700">~ {d.distanceKm} km away</p>}
            <div className="mt-3">
              <a href={`/book-driver?driverId=${d.id}`} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-3xl shadow transition">Request this driver</a>
            </div>
          </div>
        ))}
        {!loading && shown.length === 0 && <p className="text-gray-600">No drivers found.</p>}
      </div>
    </div>
  );
}

export default DriversNearby;
