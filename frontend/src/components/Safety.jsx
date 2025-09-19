import React, { useState } from "react";
import { FaCarCrash, FaPhoneAlt } from 'react-icons/fa';

function Safety() {
  const [modal, setModal] = useState(null); // 'driver' | 'police' | null
  const [success, setSuccess] = useState("");

  const handleAction = (type) => {
    setModal(type);
    setSuccess("");
  };

  const handleConfirm = () => {
    if (modal === 'driver') {
      setSuccess("A nearby driver has been notified and is on the way!");
    } else if (modal === 'police') {
      setSuccess("Nearby police have been notified. Help is on the way!");
    }
    setModal(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Safety & Emergency</h1>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 flex flex-col items-center gap-6">
        <button
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-3xl shadow-lg text-lg transition mb-4"
          onClick={() => handleAction('driver')}
        >
          <FaCarCrash className="text-2xl" /> Drunk Mode: Call a Driver Now
        </button>
        <button
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-3xl shadow-lg text-lg transition"
          onClick={() => handleAction('police')}
        >
          <FaPhoneAlt className="text-2xl" /> Notify Nearby Police
        </button>
        <p className="text-gray-600 text-center mt-4">If you feel unfit to drive, use the options above to stay safe. Our system will connect you to a nearby driver or alert the authorities.</p>
        {success && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow text-center w-full">{success}</div>
        )}
      </div>
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-blue-900">{modal === 'driver' ? 'Call a Driver?' : 'Notify Police?'}</h2>
            <p className="mb-6 text-gray-700 text-center">
              {modal === 'driver'
                ? 'Are you sure you want to call a nearby driver for assistance?'
                : 'Are you sure you want to notify the nearby police?'}
            </p>
            <div className="flex gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-3xl shadow"
                onClick={handleConfirm}
              >
                Yes, Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-3xl shadow"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Safety;
