import express from 'express';
import {
  createLead,
  getLeads,
  updateLead,
  exportLeadsCSV
} from '../controllers/leadController.js';
import { protect, authorize } from '../middleware/auth.js';
import { leadSubmissionLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public lead capture route (with anti-spam rate limiting)
router.post('/', leadSubmissionLimiter, createLead);

// Protected Admin CRM Routes
router.get('/admin', protect, getLeads);
router.put('/admin/:id', protect, updateLead);
router.get('/admin/export', protect, authorize('admin', 'superadmin'), exportLeadsCSV);

export default router;
