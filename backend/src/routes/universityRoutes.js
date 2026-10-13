import express from 'express';
import {
  getUniversities,
  getUniversityBySlug
} from '../controllers/universityController.js';

const router = express.Router();

router.get('/', getUniversities);
router.get('/:slug', getUniversityBySlug);

export default router;
