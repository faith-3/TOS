import React from "react";

function DriversNearby() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Drivers Nearby</h1>
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Available Drivers</h2>
        <ul>
          <li className="mb-2">Driver 1 - 2km away</li>
          <li className="mb-2">Driver 2 - 3.5km away</li>
          <li className="mb-2">Driver 3 - 5km away</li>
        </ul>
      </div>
    </div>
  );
}

export default DriversNearby;
