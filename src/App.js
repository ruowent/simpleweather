import { useState, useEffect } from 'react';
import axios from 'axios';
// import { kelvinToCelsius } from './components/helpers/weatherHelpers';

import './App.scss';

function App() {
  const [searchData, setSearchData] = useState({
    city: ""
  });
  const [currentCity, setCurrentCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (searchData) => {
    setCurrentCity(searchData.city)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchData({ ...searchData, [name]: value });
  };

  useEffect(() => {
    if (currentCity) {
      const APIKEY = process.env.REACT_APP_APIKEY;
      // const url = `//api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${APIKEY}`;
      const url = `//api.openweathermap.org/data/2.5/forecast?q=${currentCity}&units=metric&cnt=7&appid=${APIKEY}`;
      axios
        .get(url)
        .then(res => {
          setWeatherData(res.data);
          setErrorMsg("");
        })
        .catch(err => setErrorMsg("City not found"));
    }
  }, [currentCity])

  console.log(weatherData);

  return (
    <div className="App">
      Weather app
      <form className="weather-search" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Toronto, Canada"
          value={searchData.city}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {errorMsg && errorMsg}
      <section className="CurrentWeather">

        {weatherData &&
          <ul>
            <li>Description: {weatherData.list[0].weather[0].description}</li>
            <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`} />
            <li>Current: {weatherData.list[0].main.temp}°c</li>
            <li>Minimum: {weatherData.list[0].main.temp_min}°c</li>
            <li>Maximum: {weatherData.list[0].main.temp_max}°c</li>
            <li>Wind Speed: {weatherData.list[0].wind.speed}km/hr</li>
            <li>Humidity: {weatherData.list[0].main.humidity}%</li>
            <li>Precipitation: {weatherData.list[0].pop}%</li>
          </ul>
        }

        Weather description (ex. rain, snow)

        ○ Minimum temperature
        ○ Maximum temperature
        ○ Wind speed
        ○ Precipitation
        ○ Humidity
      </section>
    </div>
  );
}

export default App;
