import { Router } from 'express';
import prisma from '../prismaClient.js';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id }, select: { id: true, name: true, email: true, role: true, address: true, nickname: true, dob: true, photoUrl: true, createdAt: true } });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (e) { next(e); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { name, address, nickname, dob, photoUrl } = req.body;
    const data = {};
    if (typeof name !== 'undefined') data.name = name;
    if (typeof address !== 'undefined') data.address = address;
    if (typeof nickname !== 'undefined') data.nickname = nickname;
    if (typeof dob !== 'undefined') data.dob = dob ? new Date(dob) : null;
    if (typeof photoUrl !== 'undefined') data.photoUrl = photoUrl;
    const updated = await prisma.user.update({ where: { id: req.params.id }, data, select: { id: true, name: true, email: true, role: true, address: true, nickname: true, dob: true, photoUrl: true, createdAt: true } });
    res.json(updated);
  } catch (e) { next(e); }
});

export default router;


