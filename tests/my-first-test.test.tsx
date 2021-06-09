import React from "react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import { render, screen } from "@testing-library/react";

describe("Index page", () => {
  it("should render", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
