import Weather from './Weather';

export default function WeatherCards({ weatherData }) {
  return (
    weatherData.slice(1).map((weatherObj, index) => {
      return (
        <Weather key={index} weatherData={weatherObj} />
      )
    })
  )
}