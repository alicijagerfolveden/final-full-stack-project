import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EventUsers } from "../EventUsers";

describe("EventUsers", () => {
  it("should render table", () => {
    render(
      <BrowserRouter>
        <EventUsers />
      </BrowserRouter>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it.each(["Full Name", "Email", "Birthday"])(
    "should render table headers: %s",
    (name) => {
      render(
        <BrowserRouter>
          <EventUsers />
        </BrowserRouter>
      );

      expect(screen.getByText(name)).toBeInTheDocument();
    }
  );

  it("should render loading text  while fetching", () => {
    render(
      <BrowserRouter>
        <EventUsers />
      </BrowserRouter>
    );

    expect(screen.getByRole("loading-message")).toBeInTheDocument();
    expect(screen.getByRole("loading-message").textContent).toBe("Loading...");
  });
});
