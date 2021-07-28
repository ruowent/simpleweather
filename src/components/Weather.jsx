import { unixToWeekday } from './helpers/weatherHelpers';

export default function WeatherCards({ weatherData }) {
  const { min, max, day } = weatherData.temp;
  const { humidity, dt, wind_speed, pop } = weatherData;
  const { description, icon } = weatherData.weather[0];
  const weekday = unixToWeekday(dt);

  return (
    <ul>
      <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <li>{weekday}</li>
      <li>Description: {description}</li>
      <li>Day: {day}°C</li>
      <li>Minimum: {min}°C</li>
      <li>Maximum: {max}°C</li>
      <li>Wind Speed: {wind_speed}km/hr</li>
      <li>Humidity: {humidity}%</li>
      <li>Precipitation: {pop}%</li>
    </ul>
  )

}