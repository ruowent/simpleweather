import { unixToWeekday } from './helpers/weatherHelpers';
import './Weather.scss';

export default function WeatherCards({ weatherData }) {
  const { min, max, day } = weatherData.temp;
  const { humidity, dt, wind_speed } = weatherData;
  const { description, icon } = weatherData.weather[0];
  const pop = weatherData.pop * 100;
  const weekday = unixToWeekday(dt);

  return (
    <div className="current-weather">
      <h2>{weekday}</h2>
      <div className="weather-row2">
        <div className="column1">
          <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          <div>{description}</div>
        </div>
        <div style={{ fontSize: "4rem" }}>{day.toFixed(0)}°C</div>
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