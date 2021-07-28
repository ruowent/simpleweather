import './CurrentWeather.scss';

export default function CurrentWeather({ weatherData }) {
  const { temp, humidity, wind_speed } = weatherData.current;
  const { description, icon } = weatherData.current.weather[0];
  const { min, max } = weatherData.daily[0].temp;
  const pop = weatherData.daily[0].pop;

  return (
    <ul>
      <li>Description: {description}</li>
      <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
      <li>Current: {temp}°C</li>
      <li>Minimum: {min}°C</li>
      <li>Maximum: {max}°C</li>
      <li>Wind Speed: {wind_speed}km/hr</li>
      <li>Humidity: {humidity}%</li>
      <li>Precipitation: {pop}%</li>
    </ul>
  )
}