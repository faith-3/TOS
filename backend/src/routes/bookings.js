import { Router } from 'express';
import prisma from '../prismaClient.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { driverId, userId } = req.query;
    const where = {};
    if (driverId) where.driverId = driverId;
    if (userId) where.userId = userId;
    const data = await prisma.booking.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { pickup, dropoff, when, notes, driverId } = req.body;
    if (!pickup || !dropoff || !when) {
      return res.status(400).json({ error: 'pickup, dropoff and when are required' });
    }
    const booking = await prisma.booking.create({ data: { pickup, dropoff, when: new Date(when), notes: notes || undefined, driverId: driverId || undefined } });
    res.status(201).json(booking);
  } catch (e) { next(e); }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['Pending','Scheduled','Completed','Cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await prisma.booking.update({ where: { id }, data: { status } });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({ where: { id } });
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;


