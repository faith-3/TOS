import React from "react";

function MyBookings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">My Bookings</h1>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Current Bookings</h2>
        <ul className="mb-6">
          <li className="mb-2">No current bookings.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Past Bookings</h2>
        <ul>
          <li className="mb-2">No past bookings.</li>
        </ul>
      </div>
    </div>
  );
}

export default MyBookings;
