import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AcademicSupervisorDashboard from "./AcaDashboard";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: 4,
      name: "Dr. Peter",
      role: "ACADEMIC_SUPERVISOR",
    },
  }),
}));

describe("AcademicSupervisorDashboard", () => {
  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <AcademicSupervisorDashboard />
      </MemoryRouter>
    );

  it("renders without crashing", () => {
    renderDashboard();
  });

  it("displays academic supervisor heading", () => {
    renderDashboard();
    expect(
      screen.getByRole("heading", { name: /academic supervisor/i })
    ).toBeInTheDocument();
  });

  it("displays at least one navigation link or card", () => {
    renderDashboard();
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});