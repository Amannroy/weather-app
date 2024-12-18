import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import WeatherSearch from './components/weather/WeatherSearch';
import WeatherReport from './components/weather/WeatherReport';
import './App.css';
import RefreshHandler from './RefreshHandler';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/" />
  }

  return (
    <BrowserRouter>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<PrivateRoute element={<WeatherSearch/> }/>} />
        <Route path="/report" element={<PrivateRoute element={<WeatherReport />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
