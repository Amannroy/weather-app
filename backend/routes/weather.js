import express from 'express';
import { searchWeather } from '../controllers/weatherController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getWeatherReport } from '../controllers/reportController.js';


const router = express.Router();

router.post('/search', isAuthenticated, searchWeather);
router.get('/report', isAuthenticated, getWeatherReport);

export default router;