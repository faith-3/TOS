import React from "react";
import Navbar from "./Navbar";

function TopContent() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-900 text-center">Top Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {[1,2,3,4,5,6].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
              <h2 className="text-xl font-semibold mb-2 text-blue-800">Content Title {item}</h2>
              <p className="text-gray-600 text-center">This is a sample description for top content item {item}. Make this section dynamic later!</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TopContent;
