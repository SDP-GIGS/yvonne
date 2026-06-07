import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: null }),
}));

describe("LandingPage", () => {
  const renderLandingPage = () =>
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
it("displays feature tags", () => {
  renderLandingPage();
  expect(screen.getByText("Weekly logs", { exact: true })).toBeInTheDocument();
  expect(screen.getByText("Supervisor review", { exact: true })).toBeInTheDocument();
  expect(screen.getByText("Progress reporting", { exact: true })).toBeInTheDocument();
});
});