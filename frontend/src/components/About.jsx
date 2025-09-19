import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">About Tubyikorere</h1>
      <div className="w-full max-w-2xl bg-blue-50 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">How It Works</h2>
        <p className="mb-4 text-gray-700">Tubyikorere helps you rent a professional driver when you’re unable or unwilling to drive. Whether you’re tired, unwell, or have had a drink, our platform connects you to trusted drivers nearby. We also offer emergency features to keep you safe on the road.</p>
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Contact Us</h2>
        <p className="text-gray-700">Email: support@tubyikorere.com<br/>Phone: +123 456 7890</p>
      </div>
    </div>
  );
}

export default About;
