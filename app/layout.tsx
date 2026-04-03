export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f14] text-gray-200">
        <div className="flex h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-[#111827] border-r border-[#1f2937] p-4 flex flex-col">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-white">AF</h1>
              <p className="text-xs text-gray-400 tracking-widest">
                WORKBENCH
              </p>
            </div>

            <nav className="space-y-2">
              <a href="/" className="block px-3 py-2 rounded hover:bg-[#1f2937]">
                Dashboard
              </a>
              <a href="/fields/1" className="block px-3 py-2 rounded hover:bg-[#1f2937]">
                Fields
              </a>
              <a className="block px-3 py-2 rounded text-gray-500">
                Inputs
              </a>
              <a className="block px-3 py-2 rounded text-gray-500">
                Finances
              </a>
            </nav>
          </aside>

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col">

            {/* HEADER */}
            <header className="h-16 border-b border-[#1f2937] flex items-center px-6">
              <h1 className="text-lg font-semibold">AgriForge Workbench</h1>
            </header>

            {/* CONTENT */}
            <main className="p-6 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>

          </div>

        </div>
      </body>
    </html>
  );
}