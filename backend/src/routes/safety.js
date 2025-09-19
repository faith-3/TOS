import { Router } from 'express';

const router = Router();

router.post('/drunk-mode', async (req, res) => {
  // Placeholder: trigger driver notification workflow
  res.json({ ok: true, message: 'Nearby driver notified' });
});

router.post('/notify-police', async (req, res) => {
  // Placeholder: trigger police notification workflow
  res.json({ ok: true, message: 'Nearby police notified' });
});

export default router;


