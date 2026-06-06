test("renders supervisor dashboard", () => {
  render(
    <MemoryRouter>
      <WorkplaceSupervisorDashboard />
    </MemoryRouter>
  );

  expect(screen.getAllByText(/pending reviews/i).length).toBeGreaterThan(0);

  expect(screen.getAllByText(/my students/i).length).toBeGreaterThan(0);
});