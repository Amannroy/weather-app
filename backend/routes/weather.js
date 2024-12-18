import express from 'express';
import { searchWeather } from '../controllers/weatherController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/search', isAuthenticated, searchWeather);

export default router;