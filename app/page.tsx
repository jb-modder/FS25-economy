export default function Page() {
  return (
    <main className="px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto w-full">

      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-farm-subtle mb-1">Overview</p>
        <h1 className="text-2xl font-bold text-farm-text">Farm Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-widest text-farm-subtle mb-3">Cash Balance</p>
          <p className="text-2xl font-bold text-farm-accent">$0.00</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-widest text-farm-subtle mb-3">Grain Inventory</p>
          <p className="text-2xl font-bold text-farm-accent">0 bu</p>
        </div>
      </div>

      {/* Fields panel */}
      <div className="panel">
        <div className="panel-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-farm-subtle">Fields</p>
        </div>
        <div className="p-2">
          <a
            href="/fields/1"
            className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-farm-border transition-colors group"
          >
            <div>
              <p className="text-sm font-medium text-farm-text">Field 1</p>
              <p className="text-xs text-farm-muted mt-0.5">80 acres — Corn</p>
            </div>
            <span className="text-farm-subtle group-hover:text-farm-accent-dim text-sm transition-colors">→</span>
          </a>
        </div>
      </div>

    </main>
  );
}
