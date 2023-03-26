import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../NotFoundPage";

describe("NotFoundPage", () => {
  it("should render NotFoundPage", () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});
