test("renders admin dashboard", () => {
  render(
    <MemoryRouter>
      <AdminDashboardPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/administrator dashboard/i)).toBeInTheDocument();

  expect(screen.getAllByText(/manage users/i).length).toBeGreaterThan(0);
});