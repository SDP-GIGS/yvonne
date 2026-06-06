import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";

import LandingPage from "./LandingPage";
import { AuthProvider } from "../context/AuthContext";

test("landing page renders without crashing", () => {
  const { container } = render(
    <MemoryRouter>
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(container).toBeTruthy();
});