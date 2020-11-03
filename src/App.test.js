import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

test("should create the app", () => {
  const { getByText } = render(<App />);
  expect(getByText(/hackerNews/i)).toBeInTheDocument();
});
