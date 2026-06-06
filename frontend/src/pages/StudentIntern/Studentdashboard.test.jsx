import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import StudentDashboard from "./Studentdashboard";

vi.mock("../../hooks/useData", () => ({
  useStudentDashboard: () => ({
    data: { first_name: "Walid", last_name: "Kahuma", email: "test@test.com" },
    loading: false,
    error: null,
  }),
  useStudentLogs: () => ({
    data: [],
    loading: false,
  }),
  useStudentPlacement: () => ({
    data: [],
    loading: false,
  }),
}));

test("renders student dashboard", () => {
  render(
    <MemoryRouter>
      <StudentDashboard />
    </MemoryRouter>
  );

  expect(screen.getByText(/walid kahuma/i)).toBeInTheDocument();

  expect(screen.getAllByText(/my placement/i).length).toBeGreaterThan(0);

  expect(screen.getAllByText(/logbook progress/i).length).toBeGreaterThan(0);
});