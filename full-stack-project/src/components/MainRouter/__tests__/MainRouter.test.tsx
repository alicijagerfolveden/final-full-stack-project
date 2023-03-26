import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "../MainRouter";

describe("MainRouter", () => {
  it("should render Header", () => {
    render(
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );

    expect(screen.getByText("Make your life happier")).toBeInTheDocument();
  });

  it("should render Footer", () => {
    render(
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Copyright © Register to events. All rights reserved.")
    ).toBeInTheDocument();
  });
});
