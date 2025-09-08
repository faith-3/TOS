import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">You are already logged in!</h1>
          <Link to="/" className="text-blue-700 hover:underline">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 text-center">Log In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="p-3 rounded border border-gray-300" required />
          <input type="password" placeholder="Password" className="p-3 rounded border border-gray-300" required />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">Log In</button>
        </form>
        <p className="text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
