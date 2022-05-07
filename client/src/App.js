import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import DetailedWeather from './components/DetailedWeather';

function App() {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState({});
  const [alertBox, setAlertBox] = useState('');

  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/weather',{
          params: {
            location: 'london',
          }
        });
        setCurrentWeather({
          location: response.data.name,
          weather: response.data.weather[0].main,
          temp: response.data.main.temp,
          humidity: response.data.main.humidity,
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
          feels_like: response.data.main.feels_like,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          pressure: response.data.main.pressure,
        })
      } catch(error) {
        setAlertBox(error.response.data);
      }
    })();
  }, []);

  async function getCurrentWeather(location) {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/weather',{
        params: {
          location: location,
        }
      });
      setCurrentWeather({
        location: response.data.name,
        weather: response.data.weather[0].main,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
        feels_like: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        pressure: response.data.main.pressure,
      })
    } catch(error) {
      setAlertBox(error.response.data);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Location validation
    const regex = /^[A-Za-z\s]+$/;
    if(!regex.test(location)) {
      setAlertBox('Location must contain only letters.');
    }else if(location.length > 20){
      setAlertBox('Location length must be less than 20 characters.');
    }else {
      setAlertBox('');
      getCurrentWeather(location);
    }
  }

  const handleChange = (e) => {
    setLocation(e.target.value);
  }

  return (
    <div className='app-container'>
      <div className='app'>

        <h1 className='app-title'>WEATHER APP</h1>

        <form className='app-form' onSubmit={handleSubmit}>
          <input className='app-search-input' onChange={handleChange}></input>
          <button type='submit' className='app-search-button'>Search</button>
          {
            alertBox.length > 0 &&
              <span className='alert'>
                {alertBox}
              </span>
          }
        </form>

        <div className='tab'>
          <Link to="/" className='tab-btn'>Current Weather</Link>
          <Link to="/detail" className="tab-btn">More Details</Link>
        </div>

        <div className='weather'>
            <Routes>
              <Route exact path="/detail" element={<DetailedWeather weatherData={currentWeather} />} />
              <Route path='*' element={<CurrentWeather weatherData={currentWeather} />} />
            </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
