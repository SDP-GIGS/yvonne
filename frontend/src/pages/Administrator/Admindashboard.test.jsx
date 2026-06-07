import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {AdminDashboard } from "./Admindashboard";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: 1,
      name: "Walid Admin",
      role: "ADMIN",
    },
  }),
}));

describe("AdminDashboard", () => {
  const renderDashboard = () =>
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

  it("renders without crashing", () => {
    renderDashboard();
  });

  it("displays admin dashboard heading", () => {
    renderDashboard();
    expect(
      screen.getByRole("heading", { name: /admin/i })
    ).toBeInTheDocument();
  });

  it("displays at least one navigation link or card", () => {
    renderDashboard();
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});