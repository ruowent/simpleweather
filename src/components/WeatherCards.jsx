import Weather from './Weather';
import './Weather.scss';

export default function WeatherCards({ weatherData }) {
  return (
    <div className="forecast">
      <h2>7 Days Forecast</h2>
      {weatherData.slice(1).map((weatherObj, index) => {
        return (
          <Weather key={index} weatherData={weatherObj} />
        )
      })}
    </div>
  )
}