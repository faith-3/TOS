import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api, endpoints } from "../lib/api";

function DriverProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [bio, setBio] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [editMode, setEditMode] = useState(false);

  const driverId = (() => { try { return localStorage.getItem('driverId') || null; } catch { return null; } })();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        if (driverId) {
          const list = await api.get(`${endpoints.drivers.list}?userId=${user?.id}`);
          const d = Array.isArray(list) ? list[0] : null;
          if (d) {
            setName(d.name || name);
            setLocation(d.location || "");
            setAvailable(!!d.available);
            setPhotoUrl(d.photoUrl || "");
            setPhone(d.phone || "");
            setEmail(d.email || "");
            setVehicleType(d.vehicleType || "");
            setPlateNumber(d.plateNumber || "");
            setExperienceYears(d.experienceYears?.toString?.() || "");
            setPricePerKm(d.pricePerKm?.toString?.() || "");
            setBio(d.bio || "");
          }
        }
      } catch (e) {
        setError(e.message || 'Failed to load driver profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id, driverId]);

  const save = async (e) => {
    e.preventDefault();
    if (!editMode || saving) return;
    setSaving(true);
    setError("");
    try {
      const saved = await api.post(endpoints.drivers.list, { name, location, available, photoUrl, phone, email, vehicleType, plateNumber, experienceYears: experienceYears ? Number(experienceYears) : undefined, pricePerKm: pricePerKm ? Number(pricePerKm) : undefined, bio, userId: user?.id });
      if (saved?.id) {
        try { localStorage.setItem('driverId', saved.id); } catch {}
      }
    } catch (e) {
      setError(e.message || 'Failed to save');
    } finally {
      setSaving(false);
      setEditMode(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">Driver Profile</h1>
      {loading ? <p className="text-gray-600">Loading...</p> : (
        <div className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-xl">
          {error && <div className="p-3 rounded bg-red-100 text-red-700">{error}</div>}
          <div className="flex items-start justify-between w-full">
            <div className="flex-1" />
            {!editMode && (
              <button className="text-blue-600" onClick={()=>setEditMode(true)} aria-label="Edit profile">Edit</button>
            )}
          </div>
          <div className="flex flex-col items-center">
            <img src={photoUrl || 'https://via.placeholder.com/96'} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          </div>
          {!editMode ? (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Name</span>
                <span className="flex-1 text-right">{name || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Location</span>
                <span className="flex-1 text-right">{location || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Phone</span>
                <span className="flex-1 text-right">{phone || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Email</span>
                <span className="flex-1 text-right">{email || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Vehicle</span>
                <span className="flex-1 text-right">{vehicleType || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Plate</span>
                <span className="flex-1 text-right">{plateNumber || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Experience (years)</span>
                <span className="flex-1 text-right">{experienceYears || '—'}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Price per km</span>
                <span className="flex-1 text-right">{pricePerKm || '—'}</span>
              </div>
              <div>
                <span className="block text-gray-600 mb-1">Bio</span>
                <p className="text-right whitespace-pre-line">{bio || '—'}</p>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Availability</span>
                <span className="flex-1 text-right">{available ? 'Available' : 'Unavailable'}</span>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={()=>setEditMode(true)} className="bg-white border border-gray-300 text-blue-900 font-bold py-2 px-6 rounded-3xl shadow-sm transition">Edit</button>
              </div>
            </div>
          ) : (
            <form onSubmit={save} className="mt-4 flex flex-col gap-4">
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name" className="p-3 rounded border border-gray-300" required />
              <input value={location} onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Usual location" className="p-3 rounded border border-gray-300" />
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" placeholder="Phone" className="p-3 rounded border border-gray-300" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 rounded border border-gray-300" />
              <input value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)} type="text" placeholder="Vehicle type (e.g., Sedan)" className="p-3 rounded border border-gray-300" />
              <input value={plateNumber} onChange={(e)=>setPlateNumber(e.target.value)} type="text" placeholder="Plate number" className="p-3 rounded border border-gray-300" />
              <input value={experienceYears} onChange={(e)=>setExperienceYears(e.target.value)} type="number" min="0" placeholder="Experience years" className="p-3 rounded border border-gray-300" />
              <input value={pricePerKm} onChange={(e)=>setPricePerKm(e.target.value)} type="number" min="0" step="0.01" placeholder="Price per km" className="p-3 rounded border border-gray-300" />
              <textarea value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Short bio" className="p-3 rounded border border-gray-300" rows={3} />
              <label className="flex items-center gap-2 text-blue-900">
                <input type="checkbox" checked={available} onChange={(e)=>setAvailable(e.target.checked)} />
                Currently available for bookings
              </label>
              <div>
                <label className="block text-blue-900 mb-2">Profile Photo</label>
                <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setPhotoUrl(String(r.result)); r.readAsDataURL(f); }} />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={()=>setEditMode(false)} className="bg-white border border-gray-300 text-blue-900 font-bold py-2 px-6 rounded-3xl shadow-sm transition">Cancel</button>
                <button disabled={saving} type="submit" className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-2 px-6 rounded-3xl shadow-lg transition">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default DriverProfile;
