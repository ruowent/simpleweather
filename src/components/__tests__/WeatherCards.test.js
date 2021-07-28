import React from "react";

import { render, cleanup } from "@testing-library/react";

import WeatherCards from "../WeatherCards";

afterEach(cleanup);

const weatherData = [{
  dt: 1627495200,
  sunrise: 1627471561,
  sunset: 1627521543,
  moonrise: 1627533120,
  moonset: 1627488060,
  moon_phase: 0.66,
  temp: {
    day: 34.03,
    min: 23.6,
    max: 36.21,
    night: 27.29,
    eve: 32.87,
    morn: 23.85
  },
  feels_like: {
    day: 38.8,
    night: 29.35,
    eve: 38.5,
    morn: 24.69
  },
  pressure: 1016,
  humidity: 51,
  dew_point: 22.56,
  wind_speed: 2.94,
  wind_deg: 188,
  wind_gust: 4.64,
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d"
    }
  ],
  clouds: 89,
  pop: 0.66,
  rain: 2.14,
  uvi: 10.14
}, {
  dt: 1627581600,
  sunrise: 1627558003,
  sunset: 1627607899,
  moonrise: 1627621140,
  moonset: 1627577880,
  moon_phase: 0.69,
  temp: {
    day: 35.15,
    min: 24.93,
    max: 36.72,
    night: 28.62,
    eve: 34.67,
    morn: 25.08
  },
  feels_like: {
    day: 38.8,
    night: 30.14,
    eve: 38.82,
    morn: 25.81
  },
  pressure: 1016,
  humidity: 44,
  dew_point: 21.11,
  wind_speed: 2.44,
  wind_deg: 180,
  wind_gust: 3.86,
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }
  ],
  clouds: 2,
  pop: 0,
  uvi: 10.38
}
];

it("renders without crashing", () => {
  render(<WeatherCards weatherData={weatherData} />);
});

it("renders weather array and display weather description", () => {
  const { getByText } = render(<WeatherCards weatherData={weatherData} />);
  expect(getByText("clear sky")).toBeInTheDocument();
});