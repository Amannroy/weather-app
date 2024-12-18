import { fetchWeatherReport } from "../services/reportService.js";

export const getWeatherReport = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId added by the middleware
    const report = await fetchWeatherReport(userId); // Fetch weather report using userId
    res.json(report); // Send the report data as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
