import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

export default function Weather() {
  const [city, setCity] = useState('');
  const [meteorology, setMeteorology] = useState(false);
  const [weather, setWeather] = useState({});

  function runWeather(response) {
    setMeteorology(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = '26f707e504a3173f7ff66b88f084e8a0';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(runWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  <div>
  let form = (
    <form  onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (meteorology) {
    return (
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
    );
  } else {
    return {form};
  }
}
