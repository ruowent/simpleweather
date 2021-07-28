import { useState, useEffect } from 'react';
import axios from 'axios';

import CurrentWeather from './components/CurrentWeather';
import WeatherCards from './components/WeatherCards';

// import { kelvinToCelsius } from './components/helpers/weatherHelpers';

import './App.scss';

function App() {
  const [formInput, setFormInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (searchData) => {
    setSearchData(searchData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formInput);
  };

  const handleChange = (event) => {
    setFormInput(event.target.value);
  };

  useEffect(() => {
    if (searchData) {
      const APIKEY = process.env.REACT_APP_APIKEY;
      const citySearchURL = `//api.openweathermap.org/geo/1.0/direct?q=${searchData}&limit=1&appid=${APIKEY}`;

      const postcodeSearchURL = `//api.openweathermap.org/geo/1.0/zip?zip=${searchData},CA&appid=${APIKEY}`;

      const getWeatherData = async (getGeoCoorsURL) => {
        try {
          // GET geo coordinates based on city name/zip code
          const geoCoors = await axios.get(getGeoCoorsURL);
          let geoData = geoCoors.data;

          if (Array.isArray(geoData)) {
            geoData = geoData[0];
          }

          const { lat, lon } = geoData;

          // GET weather data based on geo coordinates then save to WeatherData state
          const weatherSearchURL = `//api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&units=metric&exclude=minutely,hourly,alert&appid=${APIKEY}`;

          const weatherSearchData = await axios.get(weatherSearchURL);
          setWeatherData(weatherSearchData.data);
          setErrorMsg("");
        }
        catch (error) {
          setErrorMsg("Weather data not found. Please search by City, Country or Post code");
          setWeatherData("");
          // Remove 404 error console.log which displays API key as part of the url
          if (error.response && error.response.status === 404) { console.clear() };
        }
      };

      // Search by city name or post code based on form input value
      const containNumber = /\d/.test(searchData);
      if (containNumber) {
        getWeatherData(postcodeSearchURL);
      } else {
        getWeatherData(citySearchURL);
      };
    }
  }, [searchData])

  return (
    <div className="App">
      <h2>Simple Weather</h2>
      <form className="weather-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City name or First three letters of post code, eg. Toronto, M3C"
          value={formInput}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {errorMsg && errorMsg}

      {weatherData && (
        <section className="Weather">
          <CurrentWeather weatherData={weatherData} />
          <WeatherCards weatherData={weatherData.daily} />
        </section>
      )}
    </div>
  );
}

export default App;
