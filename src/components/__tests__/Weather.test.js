import React from "react";

import { render, cleanup } from "@testing-library/react";

import Weather from "../Weather";

afterEach(cleanup);

const weatherData = {
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
};

it("renders without crashing", () => {
  render(<Weather weatherData={weatherData} />);
});

it("renders weather data and display weekday", () => {
  const { getByText } = render(<Weather key="1" weatherData={weatherData} />);
  expect(getByText("Wednesday")).toBeInTheDocument();
});