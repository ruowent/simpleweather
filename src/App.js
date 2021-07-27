import { useState, useEffect } from 'react';
import axios from 'axios';
import { kelvinToCelsius } from './components/helpers/weatherHelpers';

import './App.scss';

function App() {
  const [searchData, setSearchData] = useState({
    city: ""
  });
  const [currentCity, setCurrentCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const onSubmit = (searchData) => {
    setCurrentCity(searchData.city)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;

    setSearchData({ ...searchData, [name]: value });
  };

  useEffect(() => {
    if (currentCity) {
      const APIKEY = process.env.REACT_APP_APIKEY;
      const url = `//api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIKEY}`;
      axios
        .get(url)
        .then(res => setWeatherData(res.data));
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
          placeholder="Enter a city name"
          value={searchData.city}
          onChange={handleChange}
        />
      </form>
      <section className="CurrentWeather">
        {weatherData && <h1>Current Weather for {currentCity}</h1>}
        {weatherData && <h2>{kelvinToCelsius(weatherData.main.temp)}</h2>}

      </section>
    </div>
  );
}

export default App;
