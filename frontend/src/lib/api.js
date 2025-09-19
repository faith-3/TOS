const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try { const data = await res.json(); msg = data.error || msg; } catch {}
    throw new Error(msg);
  }
  try { return await res.json(); } catch { return null; }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};

export const endpoints = {
  bookings: {
    list: '/api/bookings',
    create: '/api/bookings',
    status: (id) => `/api/bookings/${id}/status`,
  },
  drivers: {
    list: '/api/drivers',
  },
  users: {
    get: (id) => `/api/users/${id}`,
    update: (id) => `/api/users/${id}`,
  },
  auth: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    forgot: '/api/auth/forgot',
    reset: '/api/auth/reset',
  },
  safety: {
    drunk: '/api/safety/drunk-mode',
    police: '/api/safety/notify-police',
  },
};
