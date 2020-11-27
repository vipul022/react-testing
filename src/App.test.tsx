import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("When everything is OK", () => {
  // !beforeEach render the app before every test
  beforeEach(() => {
    render(<App />);
  });
  test("should render the App component without crashing", () => {
    // ! screen.debug() shows the html output of the in the console
    screen.debug();
  });
  test("should select the children that is being passed to the Custom component", () => {
    screen.getByText("Input:");
    // ! This is also implicit assertion
  });
  // !this is manily used to search label
  test("should select the input element by it's role", () => {
    screen.getByRole("textbox");
  });

  test("should select label element by it's text", () => {
    screen.getByLabelText("Input:");
  });

  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Example");
  });

  // ! all mehtods tarting with query does not throw error but it is very useful for checking negative outcome using expect with it
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
});
