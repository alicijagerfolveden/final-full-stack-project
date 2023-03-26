import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

describe("Header", () => {
  it("should render Header", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Make your life happier")).toBeInTheDocument();
  });

  it.each(["events link", "users link", "register new user link"])(
    "should render %s",
    (link) => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      expect(screen.getByLabelText(link)).toBeVisible();
    }
  );
});
