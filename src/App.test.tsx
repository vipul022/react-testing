import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
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
    screen.getAllByText(/Input/);
    // ! This is also implicit assertion
  });
  // !this is manily used to search label
  test("should select the input element by it's role", () => {
    // ! Incase the following test does not pass and returns an array of textboxes instead of html elements, we can test that using array method like it's done on line 30 and 31
    screen.getAllByRole("textbox");
    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toEqual(1);
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
  });
});

describe("When component fetches the user successfully", () => {
  beforeEach(() => {
    // console.log("mockGetUser before clear ", mockGetUser);

    mockGetUser.mockClear();

    // console.log("mockGetUser after clear ", mockGetUser);
  });
  test("should call getUser once", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });

  test("should render the username passed", async () => {
    const name = "John";
    // ! mockResolvedValueOnce will only allow to run mockGetUser once and return it's value
    mockGetUser.mockResolvedValueOnce({ id: "1", name });
    render(<App />);
    // ! the following test will check whether the value of Username was null on the first render before the useEffect
    expect(screen.queryByText(/Username/)).toBeNull();
    // ! The following tests have used await as mockGetUser receives the values from async function (api call)
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  });
});

describe("When the user enters some text in the input element", () => {
  test("should display the text in the screen", async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../));

    await userEvent.type(screen.getByRole("textbox"), "Vipul");
    expect(screen.getByText(/You typed: Vipul/));
  });
});
