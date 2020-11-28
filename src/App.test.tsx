import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

import { getUser } from "./get-user";
import { mocked } from "ts-jest/utils";
// ! jest.mock is used to mock the result of any api call,
jest.mock("./get-user");

const mockGetUser = mocked(getUser, true);

describe("When everything is OK", () => {
  // !beforeEach render the app before every test
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
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

  // ! all mehtods starting with query does not throw error but it is very useful for checking negative outcome using expect with it
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  })
});

describe("When component fetches the user successfully", () => {
  beforeEach(() => {
    console.log("mockGetUser before clear ", mockGetUser);

    mockGetUser.mockClear();

    console.log("mockGetUser after clear ", mockGetUser);
  });
  test("should call getUser once", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });
});
