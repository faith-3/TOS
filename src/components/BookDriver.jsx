import React from "react";

function BookDriver() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Book a Driver</h1>
      <form className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-lg flex flex-col gap-4">
        <input type="text" placeholder="Pickup Location" className="p-3 rounded border border-gray-300" required />
        <input type="text" placeholder="Dropoff Location" className="p-3 rounded border border-gray-300" required />
        <input type="datetime-local" className="p-3 rounded border border-gray-300" required />
        <textarea placeholder="Special Notes (optional)" className="p-3 rounded border border-gray-300" rows={3}></textarea>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">Request Driver</button>
      </form>
    </div>
  );
}

export default BookDriver;
