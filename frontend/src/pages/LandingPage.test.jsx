import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import LandingPage from "./LandingPage";

test("landing page renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(container).toBeTruthy();
});