import express from 'express';
import { signup } from '../controllers/signupController.js';

const router = express.Router();

// POST route for signup
router.post('/', signup);

export default router;
