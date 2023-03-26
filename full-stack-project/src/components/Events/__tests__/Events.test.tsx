import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Events } from "../Events";

describe("Events", () => {
  it("should render loading text while fetching", () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    expect(screen.getByLabelText("loading-message")).toBeInTheDocument();
    expect(screen.getByLabelText("loading-message").textContent).toBe(
      "Loading..."
    );
  });

  it("should render events container", () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    expect(screen.getByRole("events-container")).toBeVisible();
  });
});
