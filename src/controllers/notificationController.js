import { sendNotification } from '../services/notificationService.js';

export async function createNotification(req, res) {
  try {
    const result = await sendNotification(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}