import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StudentDashboard from "./Studentdashboard";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: 2, name: "Bob Student", role: "STUDENT" },
  }),
}));

describe("StudentDashboard", () => {
  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <StudentDashboard />
      </MemoryRouter>
    );

  it("renders without crashing", () => {
    renderDashboard();
  });

  it("displays student dashboard heading", async () => {
    renderDashboard();
    // findBy* waits for async content to appear (loading → loaded)
    expect(
      await screen.findByRole("heading", { name: /student/i })
    ).toBeInTheDocument();
  });

  it("displays at least one navigation link or card", async () => {
    renderDashboard();
    const links = await screen.findAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});