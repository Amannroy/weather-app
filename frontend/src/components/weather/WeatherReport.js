import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { weatherReportUrl } from '../../api/PostApi';
import { useNavigate } from 'react-router-dom';

const WeatherReport = () => {
    const [report, setReport] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(weatherReportUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Parse `weather_info` as it's a JSON string
                const parsedWeatherInfo = JSON.parse(res.data.weather_info);
                setReport({ ...res.data, weather_info: parsedWeatherInfo });
            } catch (error) {
                alert("Failed to fetch report");
            }
        };
        fetchReport();
    }, []);

    const navigateToWeatherSearch = () => {
        navigate('/search');
    };

    return (
        <>
            <div className="form-container">
                <h2>Weather Report</h2>
                {report && (
                    <div className="weather-report">
                        <p>Username: {report.username}</p>
                        <p>City: {report.city}</p>
                        <p>Weather Information:</p>
                        {report.weather_info && (
                            <div>
                                <p>Temperature: {report.weather_info.temperature}°C</p>
                                <p>Weather: {report.weather_info.weather_descriptions ? report.weather_info.weather_descriptions.join(', ') : 'N/A'}</p>
                                <p>Wind Speed: {report.weather_info.wind_speed} km/h</p>
                                <p>Humidity: {report.weather_info.humidity}%</p>
                                <p>Cloud Cover: {report.weather_info.cloudcover}%</p>
                                <img
                                    src={report.weather_info.weather_icons[0]}
                                    alt="Weather icon"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>
                        )}
                        <p>Search Date: {new Date(report.search_date).toLocaleString()}</p>
                    </div>
                )}
                <button onClick={navigateToWeatherSearch}>Weather Search Page</button>
            </div>
        </>
    );
};

export default WeatherReport;
