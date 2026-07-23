import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the promoted home route", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "경영과학연구실" })
  ).toBeInTheDocument();
});
