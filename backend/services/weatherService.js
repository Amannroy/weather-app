import axios from 'axios';
import jwt from 'jsonwebtoken';
import con from '../database.js';
import dotenv from 'dotenv';
import { weatherAPIKEY } from '../constants/constants.js';

dotenv.config();


export const getWeatherInfo = async(city, token) => {
    try{
       const userId = jwt.verify(token, process.env.JWT_SECRET).id;
       const apikey = weatherAPIKEY;
       const url = `https://api.weatherstack.com/current?access_key=${apikey}&query=${city}`;

       const response = await axios.get(url);
       const weatherInfo = response.data.current;

       const sql = `INSERT INTO weather_searches (user_id, city, weather_info, search_date) VALUES (?, ?, ?, NOW())`;
       await con.query(sql, [userId, city, JSON.stringify(weatherInfo)]);
       return weatherInfo;

    }catch(err){
       throw new Error("Error retrieving weather data");
    }
}