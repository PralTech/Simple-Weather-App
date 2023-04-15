import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YourApiKey`);
      if (!response.ok) {
        throw new Error('Could not fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>  Get Weather Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button className='btn' type="submit" disabled={!city}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-data">
          <h2 className='location'>{weatherData.name}</h2>
          <p className='description'>{weatherData.weather[0].description}</p>
          <p className='temperature'>Temperature: {weatherData.main.temp}°C</p>
          <p className='humidity'>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
