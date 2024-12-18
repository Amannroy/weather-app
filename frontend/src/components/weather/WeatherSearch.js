import React, { useState } from "react";
import axios from "axios";
import { weatherUrl } from "../../api/PostApi";
import { useNavigate } from "react-router-dom";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        weatherUrl,
        { city },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWeather(res.data.weatherInfo);
    } catch (error) {
      alert("Failed to fetch weather data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  } 

  const navigateToSearchReport = () => {
    navigate('/report');
  }
  return (
    <>
      <div className="form-container">
        <h2>Search Weather</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
        {weather && (
          <div className="weather-result">
            <h3>Weather Deatils:</h3>
            <p>Temperature: {weather.temperature}</p>
            <p>Weather: {weather.weather_descriptions[0]}</p>
          </div>
        )}
        <button onClick={handleLogout}>Logout</button>
        <button onClick={navigateToSearchReport}>View Search Report</button>
      </div>
    </>
  );
};

export default WeatherSearch;
