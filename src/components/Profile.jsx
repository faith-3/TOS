import React from "react";

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">My Profile</h1>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-3xl font-bold text-blue-800">U</div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-800">User Name</h2>
            <p className="text-gray-600 mb-2">user@email.com</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-3xl shadow transition">Edit Profile</button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">Payment Methods</h3>
          <p className="text-gray-600">No payment methods added.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
