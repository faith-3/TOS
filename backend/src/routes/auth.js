import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prismaClient.js';

const router = Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: role || 'user' } });
    // Auto-create driver profile if role is driver
    let driverId = null;
    if ((role || 'user') === 'driver') {
      // Reuse existing driver for this user if present; otherwise create
      const existingDriver = await prisma.driver.findUnique({ where: { userId: user.id } }).catch(() => null);
      if (existingDriver) {
        driverId = existingDriver.id;
      } else {
        const driver = await prisma.driver.create({ data: { name, userId: user.id, available: false } });
        driverId = driver.id;
      }
    }
    const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    res.status(201).json({ ...publicUser, driverId });
  } catch (e) { next(e); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const { password: _pw, ...publicUser } = user;
    res.json(publicUser);
  } catch (e) { next(e); }
});

export default router;


