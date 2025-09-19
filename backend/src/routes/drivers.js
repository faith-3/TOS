import { Router } from 'express';
import prisma from '../prismaClient.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { userId, location, available } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (location) where.location = { contains: String(location).trim(), mode: 'insensitive' };
    if (typeof available !== 'undefined') where.available = available === 'true';
    const drivers = await prisma.driver.findMany({ where, orderBy: { name: 'asc' } });
    res.json(drivers);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, rating, distanceKm, location, available, photoUrl, phone, email, vehicleType, plateNumber, experienceYears, pricePerKm, bio, userId } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    let driver;
    if (userId) {
      // If a driver already exists for this user, update it instead of creating
      const existingByUser = await prisma.driver.findUnique({ where: { userId } }).catch(() => null);
      if (existingByUser) {
        driver = await prisma.driver.update({ where: { id: existingByUser.id }, data: { name, rating: rating ?? existingByUser.rating, distanceKm: distanceKm ?? existingByUser.distanceKm, location: location ?? existingByUser.location, available: typeof available === 'boolean' ? available : existingByUser.available, photoUrl: typeof photoUrl === 'string' ? photoUrl : existingByUser.photoUrl, phone: phone ?? existingByUser.phone, email: email ?? existingByUser.email, vehicleType: vehicleType ?? existingByUser.vehicleType, plateNumber: plateNumber ?? existingByUser.plateNumber, experienceYears: typeof experienceYears === 'number' ? experienceYears : existingByUser.experienceYears, pricePerKm: typeof pricePerKm === 'number' ? pricePerKm : existingByUser.pricePerKm, bio: bio ?? existingByUser.bio } });
        return res.status(200).json(driver);
      }
      // Try to claim an existing unclaimed driver with same name
      const existingUnclaimed = await prisma.driver.findFirst({ where: { name, userId: null } });
      if (existingUnclaimed) {
        driver = await prisma.driver.update({ where: { id: existingUnclaimed.id }, data: { userId, rating: rating ?? existingUnclaimed.rating, distanceKm: distanceKm ?? existingUnclaimed.distanceKm, location: location ?? existingUnclaimed.location, available: typeof available === 'boolean' ? available : existingUnclaimed.available, photoUrl: typeof photoUrl === 'string' ? photoUrl : existingUnclaimed.photoUrl, phone: phone ?? existingUnclaimed.phone, email: email ?? existingUnclaimed.email, vehicleType: vehicleType ?? existingUnclaimed.vehicleType, plateNumber: plateNumber ?? existingUnclaimed.plateNumber, experienceYears: typeof experienceYears === 'number' ? experienceYears : existingUnclaimed.experienceYears, pricePerKm: typeof pricePerKm === 'number' ? pricePerKm : existingUnclaimed.pricePerKm, bio: bio ?? existingUnclaimed.bio } });
        return res.status(200).json(driver);
      }
    }
    driver = await prisma.driver.create({ data: { name, rating: rating ?? 0, distanceKm: distanceKm ?? null, location: location ?? null, available: !!available, photoUrl: photoUrl || null, phone: phone || null, email: email || null, vehicleType: vehicleType || null, plateNumber: plateNumber || null, experienceYears: typeof experienceYears === 'number' ? experienceYears : null, pricePerKm: typeof pricePerKm === 'number' ? pricePerKm : null, bio: bio || null, userId: userId || null } });
    res.status(201).json(driver);
  } catch (e) { next(e); }
});

router.patch('/:id/availability', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { available } = req.body;
    const driver = await prisma.driver.update({ where: { id }, data: {} });
    res.json(driver);
  } catch (e) { next(e); }
});

export default router;


