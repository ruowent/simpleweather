import { useEffect } from 'react';
import axios from 'axios';

import CurrentWeather from './components/CurrentWeather';
import WeatherCards from './components/WeatherCards';

import useApplicationData from './hooks/useApplicationData';
import './App.scss';

function App() {
  const { state, setSearchData, setCity, setWeatherData, setErrorMsg } = useApplicationData();
  const { searchData, city, weatherData, errorMsg } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchData(event.target[0].value);
    event.target.reset();
  };

  useEffect(() => {
    if (searchData) {
      const APIKEY = process.env.REACT_APP_APIKEY;
      const citySearchURL = `//api.openweathermap.org/geo/1.0/direct?q=${searchData}&limit=1&appid=${APIKEY}`;
      const postcodeSearchURL = `//api.openweathermap.org/geo/1.0/zip?zip=${searchData}&appid=${APIKEY}`;

      const getWeatherData = async (getGeoCoorsURL) => {
        try {
          // GET geo coordinates based on city name/zip code
          const geoCoors = await axios.get(getGeoCoorsURL);
          let geoData = geoCoors.data;

          // Store API response object data if geoData is an array
          // This is due to response data structure difference between city/zipcode search
          if (Array.isArray(geoData)) {
            geoData = geoData[0];
          }
          const { name, country, lat, lon } = geoData;
          setCity(`${name}, ${country}`);

          // GET weather data based on geo coordinates then save to WeatherData state
          const weatherSearchURL = `//api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&units=metric&exclude=minutely,hourly,alert&appid=${APIKEY}`;

          const weatherSearchData = await axios.get(weatherSearchURL);
          setWeatherData(weatherSearchData.data);
          setErrorMsg("");
        }
        catch (error) {
          const errorMsgData = "Weather data not found!\nPlease search by City or Post code, Country Code\n\nSearch by City: Toronto\nSearch by Post code: M3C, CA";
          setErrorMsg(errorMsgData);
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
  }, [searchData]);

  return (
    <div className="App">
      <h1>Simple Weather</h1>
      <form className="weather-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City name or first three letters of post code, eg. Toronto or M3C, CA"
        />
        <button type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
      {errorMsg &&
        <p className="error">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{errorMsg}
        </p>}

      {weatherData && (
        <section className="Weather">
          <CurrentWeather weatherData={weatherData} city={city} />
          <WeatherCards weatherData={weatherData.daily} />
        </section>
      )}
    </div>
  );
}

export default App;
