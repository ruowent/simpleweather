import React from "react";

import { render, cleanup } from "@testing-library/react";

import App from "../../App";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<App />);
});

it("renders title Simple Weather", () => {
  const { getByText } = render(<App />);
  expect(getByText("Simple Weather")).toBeInTheDocument();
});