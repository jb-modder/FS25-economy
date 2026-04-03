import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-[#0a0a0a] border-r border-green-900 p-4">
            <h1 className="text-xl font-bold text-green-400 mb-6">
              AgriForge
            </h1>

            <nav className="space-y-2">
              <a href="/" className="block p-2 hover:bg-green-900/30 rounded">
                Dashboard
              </a>
              <a href="/fields/1" className="block p-2 hover:bg-green-900/30 rounded">
                Fields
              </a>
            </nav>
          </aside>

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col">

            {/* HEADER */}
            <header className="h-16 border-b border-green-900 flex items-center px-6">
              <h2 className="text-lg font-semibold text-green-400">
                Midwest Modding Studio
              </h2>
            </header>

            {/* PAGE CONTENT */}
            <main className="p-6 overflow-y-auto">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}