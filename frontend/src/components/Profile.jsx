import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api, endpoints } from "../lib/api";
import { FaPen } from 'react-icons/fa';

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.get(endpoints.users.get(user.id));
        setProfile(data);
      } catch (e) {
        setError(e.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, [user.id]);

  const updateField = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));
  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField('photoUrl', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!editMode || saving) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        name: profile.name,
        nickname: profile.nickname,
        address: profile.address,
        dob: profile.dob,
        photoUrl: profile.photoUrl,
      };
      const updated = await api.patch(endpoints.users.update(user.id), payload);
      setProfile(updated);
      setSuccess('Profile updated');
      setEditMode(false);
    } catch (e) {
      setError(e.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <div className="bg-blue-50 rounded-xl shadow-md p-8 w-full max-w-xl">
        <div className="flex items-start justify-between w-full">
          <div className="flex-1" />
          {!editMode && (
            <button className="text-blue-600" onClick={()=>setEditMode(true)} aria-label="Edit profile"><FaPen /></button>
          )}
        </div>
        <div className="flex flex-col items-center">
          <img src={profile.photoUrl || 'https://via.placeholder.com/96'} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          {editMode ? (
            <input value={profile.name || ''} onChange={(e)=>updateField('name', e.target.value)} className="mt-3 text-center text-2xl font-bold text-blue-900 bg-white border border-gray-300 rounded px-3 py-1" />
          ) : (
            <div className="flex items-center gap-2 mt-3">
              <h2 className="text-2xl font-bold text-blue-900">{profile.name}</h2>
            </div>
          )}
          <div className="text-gray-600">@{profile.nickname || 'username'}</div>
        </div>
        {editMode && (
          <div className="mt-4">
            <label className="block text-blue-900 mb-2">Profile Photo</label>
            <input onChange={onPhotoChange} type="file" accept="image/*" className="block" />
          </div>
        )}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600">Username</span>
            {editMode ? (
              <input value={profile.nickname || ''} onChange={(e)=>updateField('nickname', e.target.value)} className="flex-1 bg-white border border-gray-300 rounded px-3 py-1" />
            ) : (
              <span className="flex-1 text-right">{profile.nickname || '—'}</span>
            )}
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600">Email</span>
            <span className="flex-1 text-right">{profile.email}</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600">Address</span>
            {editMode ? (
              <input value={profile.address || ''} onChange={(e)=>updateField('address', e.target.value)} className="flex-1 bg-white border border-gray-300 rounded px-3 py-1" />
            ) : (
              <span className="flex-1 text-right">{profile.address || '—'}</span>
            )}
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-600">DOB</span>
            {editMode ? (
              <input type="date" value={profile.dob ? profile.dob.slice(0,10) : ''} onChange={(e)=>updateField('dob', e.target.value)} className="flex-1 bg-white border border-gray-300 rounded px-3 py-1" />
            ) : (
              <span className="flex-1 text-right">{profile.dob ? new Date(profile.dob).toLocaleDateString() : '—'}</span>
            )}
          </div>
        </div>
        {success && <div className="mt-4 p-3 rounded bg-green-100 text-green-700">{success}</div>}
        {error && <div className="mt-4 p-3 rounded bg-red-100 text-red-700">{error}</div>}
        <div className="mt-6 flex justify-end gap-3">
          {editMode ? (
            <>
              <button onClick={()=>setEditMode(false)} className="bg-white border border-gray-300 text-blue-900 font-bold py-2 px-6 rounded-3xl shadow-sm transition">Cancel</button>
              <button disabled={saving} onClick={save} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-2 px-6 rounded-3xl shadow-lg transition">{saving ? 'Saving...' : 'Save'}</button>
            </>
          ) : (
            <button onClick={()=>setEditMode(true)} className="bg-white border border-gray-300 text-blue-900 font-bold py-2 px-6 rounded-3xl shadow-sm transition">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
