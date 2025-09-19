# Tubyikorere Backend (Node.js, Express)

## Scripts
- npm run dev: start with nodemon on http://localhost:4000
- npm start: start in production mode

## Structure
- src/server.js: Express app bootstrap
- src/routes/: HTTP route modules
- src/storage/jsonFile.js: simple JSON file storage helper (writes under backend/data)
- data/: runtime data (gitignored)

## Env
Create a .env file in backend/ with:
```
PORT=4000
ORIGIN=http://localhost:5173
```

## API (brief)
- GET /api/health
- Bookings
  - GET /api/bookings
  - POST /api/bookings { pickup, dropoff, when, notes? }
  - PATCH /api/bookings/:id/status { status: Pending|Scheduled|Completed|Cancelled }
  - DELETE /api/bookings/:id
- Drivers
  - GET /api/drivers
  - POST /api/drivers { id, name, rating?, distanceKm? }
- Auth (UI-only demo)
  - POST /api/auth/signup { name, email, password, role? }
  - POST /api/auth/login { email, password }
- Safety
  - POST /api/safety/drunk-mode
  - POST /api/safety/notify-police

Note: This backend uses simple JSON-file storage for demo purposes. Replace with a real DB later.
