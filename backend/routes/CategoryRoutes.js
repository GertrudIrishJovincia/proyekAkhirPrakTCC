import express from 'express';
import { getCategories, createCategory } from '../controller/CategoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);

export default router;