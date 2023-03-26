import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RegisteredUsers } from "../RegisteredUsers";

describe("RegisteredUsers", () => {
  it("should render table", () => {
    render(
      <BrowserRouter>
        <RegisteredUsers />
      </BrowserRouter>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it.each(["Full Name", "Email", "Birthday", "Event in", "Delete", "Update"])(
    "should render table headers: %s",
    (name) => {
      render(
        <BrowserRouter>
          <RegisteredUsers />
        </BrowserRouter>
      );

      expect(screen.getByText(name)).toBeInTheDocument();
    }
  );

  it("should render loading text  while fetching", () => {
    render(
      <BrowserRouter>
        <RegisteredUsers />
      </BrowserRouter>
    );

    expect(screen.getByRole("loading-message")).toBeInTheDocument();
    expect(screen.getByRole("loading-message").textContent).toBe("Loading...");
  });
});
