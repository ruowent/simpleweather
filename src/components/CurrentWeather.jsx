import './Weather.scss';
import 'font-awesome/css/font-awesome.min.css';

export default function CurrentWeather({ weatherData, city }) {
  const { temp, humidity, wind_speed } = weatherData.current;
  const { description, icon } = weatherData.current.weather[0];
  const { min, max } = weatherData.daily[0].temp;
  const pop = weatherData.daily[0].pop * 100;

  return (
    <div className="current-weather">
      <h2>Current Weather <i className="fa fa-map-marker" aria-hidden="true"></i> {city}</h2>
      <div className="weather-row2">
        <div className="column1">
          <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          <div>{description}</div>
        </div>
        <div style={{ fontSize: "4rem" }}>{temp.toFixed(0)}°C</div>
        <div className="column3">
          <div>H: {min.toFixed(0)}°C</div>
          <div>L: {max.toFixed(0)}°C</div>
        </div>
      </div>
      <div className="weather-row3">
        <div>Wind Speed: {wind_speed}km/hr</div>
        <div>Humidity: {humidity}%</div>
        <div>Precipitation: {pop}%</div>
      </div>
    </div>
  )
}