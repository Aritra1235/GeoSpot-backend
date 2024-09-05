// routes/index.js

import { Router } from 'express';
import { login } from '../controllers/loginController.js';

const router = Router();

// Define the route for login
router.get('/', login);

export default router;
