export default function Page() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Farm Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border">
          <p className="text-sm text-gray-500">Cash Balance</p>
          <p className="text-xl">$0.00</p>
        </div>

        <div className="p-4 border">
          <p className="text-sm text-gray-500">Grain Inventory</p>
          <p className="text-xl">0 bu</p>
        </div>
      </div>

      <div className="p-4 border">
        <a href="/fields/1" className="block p-3 border">
          Field 1 — 80 acres — Corn
        </a>
      </div>
    </main>
  );
}