import React, { useState } from "react";
import { api, endpoints } from "../lib/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Placeholder API call; implement on backend later
      await api.post(endpoints.auth.forgot, { email });
      setSuccess("If an account exists for this email, you'll receive reset instructions.");
    } catch (err) {
      // Even on error, avoid leaking info; show generic message
      setSuccess("If an account exists for this email, you'll receive reset instructions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 text-center">Forgot Password</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 rounded border border-gray-300" required />
          {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
          {success && <div className="p-3 rounded bg-green-100 text-green-700">{success}</div>}
          <button disabled={loading} type="submit" className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition">{loading ? 'Sending...' : 'Send Reset Link'}</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
