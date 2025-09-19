import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import bookingsRouter from './routes/bookings.js';
import driversRouter from './routes/drivers.js';
import authRouter from './routes/auth.js';
import safetyRouter from './routes/safety.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/bookings', bookingsRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/auth', authRouter);
app.use('/api/safety', safetyRouter);
app.use('/api/users', usersRouter);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


