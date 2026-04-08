function Layout({ children }) {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">

      <main className="flex-1 w-full">

        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Layout;