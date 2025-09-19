import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

function Signup() {
  const { isAuthenticated, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await signup({ name, email, password, role });
      if (user.role === 'driver') navigate('/driver'); else navigate('/');
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">You are already signed up and logged in!</h1>
          <Link to="/" className="text-blue-700 hover:underline">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name" className="p-3 rounded border border-gray-300" required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 rounded border border-gray-300" required />
          <div className="relative">
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password" className="p-3 rounded border border-gray-300 w-full pr-10" required />
            <button type="button" aria-label="Toggle password visibility" onClick={()=>setShowPassword(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="p-3 rounded border border-gray-300" aria-label="Role">
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>
          {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
          <button disabled={loading} type="submit" className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <div className="flex items-center my-4"><div className="flex-1 h-px bg-gray-300"></div><span className="px-3 text-gray-500 text-sm">or</span><div className="flex-1 h-px bg-gray-300"></div></div>
        <button type="button" className="inline-flex items-center justify-start gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-3xl shadow transition">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
        <div className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Log in</Link></div>
      </div>
    </div>
  );
}

export default Signup;