import express from 'express';
import { askCounselor } from '../controllers/counselorController.js';
import { leadSubmissionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/ask', leadSubmissionLimiter, askCounselor);

export default router;
