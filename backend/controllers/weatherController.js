import { getWeatherInfo } from "../services/weatherService.js";

export const searchWeather = async(req, res) => {
    try{
         const {city} = req.body;
         const token = req.headers.authorization.split(" ")[1];
         const weatherInfo = await getWeatherInfo(city, token);
         res.json({weatherInfo});
    }catch(err){
         res.status(500).json({message: err.message});
    }
}