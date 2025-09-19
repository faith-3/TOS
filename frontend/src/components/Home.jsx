import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import carImg from "../assets/car22.png";
import logo from "../assets/tblogo.png";

const testimonials = [
  {
    avatar: "A",
    text: "I felt so safe using Tubyikorere after a night out. The driver was professional and friendly!",
    name: "Alice M."
  },
  {
    avatar: "J",
    text: "Booking a driver was so easy and quick. Highly recommend for anyone who needs a ride!",
    name: "John D."
  },
  {
    avatar: "S",
    text: "Great service for people who want to avoid driving under the influence. Life saver!",
    name: "Sarah K."
  }
];

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const hasDriverId = (() => { try { return !!localStorage.getItem('driverId'); } catch { return false; } })();
  const navigate = useNavigate();
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handleBookNow = () => {
    if (isAuthenticated) navigate("/book-driver"); else navigate("/login");
  };
  const handleRegisterDriver = () => {
    navigate("/driver/register");
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-8 mb-12 gap-8">
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">Welcome to Tubyikorere</h1>
          <p className="text-lg md:text-2xl max-w-xl mb-8 text-gray-700">Easily rent a professional driver when you’re not in the mood or unable to drive. Stay safe, avoid driving under the influence, and get home comfortably with our trusted drivers.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleBookNow} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition text-lg">Book a Driver Now</button>
            {!hasDriverId && (
              <button onClick={handleRegisterDriver} className="bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-3xl shadow-sm transition text-lg">Register as a Driver Today</button>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={carImg} alt="Car" className="w-100 md:w-full object-contain" />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-3">🚗</span>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Book Instantly</h2>
          <p className="text-gray-600 text-center">Request a driver in seconds, anytime you need a ride.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-3">🛡️</span>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Safe & Reliable</h2>
          <p className="text-gray-600 text-center">All drivers are background-checked and rated by users.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-3">💡</span>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Smart Matching</h2>
          <p className="text-gray-600 text-center">We connect you with the nearest available driver for fast service.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <span className="text-4xl mb-3">📱</span>
            <h3 className="text-lg font-semibold mb-2 text-blue-800">1. Request</h3>
            <p className="text-gray-600 text-center">Open the app and request a driver for your location and time.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <span className="text-4xl mb-3">👨‍✈️</span>
            <h3 className="text-lg font-semibold mb-2 text-blue-800">2. Match</h3>
            <p className="text-gray-600 text-center">We match you with a nearby, verified driver ready to help.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <span className="text-4xl mb-3">🏠</span>
            <h3 className="text-lg font-semibold mb-2 text-blue-800">3. Arrive Safely</h3>
            <p className="text-gray-600 text-center">Enjoy a safe ride to your destination. Rate your driver after the trip!</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <span className="text-4xl mb-3">⏱️</span>
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Fast Response</h3>
            <p className="text-gray-600 text-center">Our drivers are always on standby to get you home quickly and safely.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <span className="text-4xl mb-3">💬</span>
            <h3 className="text-lg font-semibold mb-2 text-blue-800">24/7 Support</h3>
            <p className="text-gray-600 text-center">Our support team is available around the clock to assist you with any needs.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">What Our Users Say</h2>
        {/* Mobile: Carousel */}
        <div className="block md:hidden">
          <div className="relative flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center min-w-[18rem] max-w-xs mx-auto">
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800 mb-3">{testimonials[testimonialIdx].avatar}</div>
              <p className="text-gray-700 text-center mb-2">“{testimonials[testimonialIdx].text}”</p>
              <span className="text-sm text-gray-500">— {testimonials[testimonialIdx].name}</span>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <button onClick={prevTestimonial} aria-label="Previous" className="bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">&#8592;</button>
              <button onClick={nextTestimonial} aria-label="Next" className="bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">&#8594;</button>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              {testimonials.map((_, idx) => (
                <span key={idx} className={`inline-block w-2 h-2 rounded-full ${idx === testimonialIdx ? 'bg-orange-500' : 'bg-blue-200'}`}></span>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800 mb-3">{t.avatar}</div>
              <p className="text-gray-700 text-center mb-2">“{t.text}”</p>
              <span className="text-sm text-gray-500">— {t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer (aligned with main content) */}
      <footer className="w-full bg-blue-950 text-white py-10 mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Tubyikorere Logo" className="w-16 h-16 mb-2 rounded-full shadow" />
            <h3 className="text-xl font-bold mb-1">Tubyikorere</h3>
            <p className="text-sm text-blue-100 mb-2">Your trusted driver, anytime, anywhere.</p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="hover:text-orange-400" aria-label="Twitter"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 2c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 7.89 4.1 6.13 1.671 3.149c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg></a>
              <a href="#" className="hover:text-orange-400" aria-label="Facebook"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
              <a href="#" className="hover:text-orange-400" aria-label="Instagram"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.612.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-7.612 0-5.923-.012-6.332-.07-7.612-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <a href="/about" className="hover:text-orange-400">About</a>
            <a href="/safety" className="hover:text-orange-400">Safety</a>
            <a href="/profile" className="hover:text-orange-400">Profile</a>
            <a href="/signup" className="hover:text-orange-400">Sign Up</a>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h4 className="font-semibold mb-2">Contact</h4>
            <span className="text-blue-100">support@tubyikorere.com</span>
            <span className="text-blue-100">+123 456 7890</span>
            <span className="text-blue-100">Kigali, Rwanda</span>
          </div>
          {/* Back to Top */}
          <div className="flex flex-col items-center md:items-end justify-between gap-4">
            <button onClick={handleBackToTop} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-3xl shadow transition">Back to Top ↑</button>
            <p className="text-xs text-blue-200 mt-4">&copy; {new Date().getFullYear()} Tubyikorere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
