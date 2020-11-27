import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("When everything is OK", () => {
  test("should render the App component without crashing", () => {
    render(<App />);
    // ! render provides implicit assertion
    screen.debug();
  });
  test("should select the children that is being passed to the Custom component", () => {
    render(<App />);
    screen.getAllByText("Input:");
    // ! This is also implicit assertion
  });
});
// ! screen.debug() shows the html output of the in the console
