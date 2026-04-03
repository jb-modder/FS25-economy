"use client";
import { useState } from "react";

const farmData: Record<number, {
  seedPrice: number;
  nitrogenPrice: number;
  ohioRates: { tillage: number; planting: number; spraying: number; harvest: number };
}> = {
  2024: {
    seedPrice: 320,
    nitrogenPrice: 0.60,
    ohioRates: {
      tillage: 25,
      planting: 25,
      spraying: 15,
      harvest: 40,
    },
  },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-farm-subtle">
      {title}
    </h2>
  );
}

function InputRow({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm text-farm-muted shrink-0 w-32 sm:w-44">{label}</label>
      <div className="relative flex-1">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-farm-input border border-farm-border rounded-md px-3 py-2 w-full text-sm text-farm-text
                     hover:border-farm-subtle focus:outline-none focus:border-farm-accent-dim transition-colors"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-farm-subtle pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-farm-border last:border-0">
      <span className="text-xs text-farm-muted">{label}</span>
      <span className="text-base font-semibold" style={{ color: "#d1d5db" }}>{value}</span>
    </div>
  );
}

const refRowClass = "grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-farm-subtle pt-2";

export default function Page() {
  const [acres, setAcres] = useState(80);
  const [seedRate, setSeedRate] = useState(32000);
  const [nitrogenRate, setNitrogenRate] = useState(150);
  const [selectedYear, setSelectedYear] = useState(2024);

  const { seedPrice, nitrogenPrice, ohioRates } = farmData[selectedYear];
  const seedsPerBag = 80000;

  const totalSeeds = acres * seedRate;
  const seedBags = totalSeeds / seedsPerBag;
  const seedCost = seedBags * seedPrice;

  const operationCostPerAcre = Object.values(ohioRates).reduce((sum, rate) => sum + rate, 0);
  const totalOperationCost = operationCostPerAcre * acres;
  const totalNitrogen = acres * nitrogenRate;
  const nitrogenCost = totalNitrogen * nitrogenPrice;
  const totalCost = seedCost + nitrogenCost + totalOperationCost;

  return (
    <main className="px-4 py-6 sm:px-8 sm:py-10 max-w-2xl mx-auto w-full">

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-farm-subtle mb-1">Field Calculator</p>
          <h1 className="text-2xl font-bold text-farm-text">Field 1</h1>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-farm-input border border-farm-border rounded-md px-3 py-2 w-28 text-sm text-farm-text
                     cursor-pointer hover:border-farm-subtle focus:outline-none focus:border-farm-accent-dim transition-colors"
        >
          {Object.keys(farmData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Input panels */}
      <div className="space-y-3">

        <div className="panel p-4 sm:p-5 space-y-3">
          <SectionHeader title="Field" />
          <InputRow label="Acres" unit="ac" value={acres} onChange={setAcres} />
        </div>

        <div className="panel p-4 sm:p-5 space-y-3">
          <SectionHeader title="Seed" />
          <InputRow label="Seed Population" unit="seeds/ac" value={seedRate} onChange={setSeedRate} />
          <div className={refRowClass}>
            <span>Price per bag</span><span className="text-right">${seedPrice.toFixed(2)}</span>
            <span>Seeds per bag</span><span className="text-right">{seedsPerBag.toLocaleString()}</span>
          </div>
        </div>

        <div className="panel p-4 sm:p-5 space-y-3">
          <SectionHeader title="Nitrogen" />
          <InputRow label="Application Rate" unit="lb/ac" value={nitrogenRate} onChange={setNitrogenRate} />
          <div className={refRowClass}>
            <span>Price per lb</span><span className="text-right">${nitrogenPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="panel p-4 sm:p-5 space-y-3">
          <SectionHeader title="Operations — Ohio State Custom Rates" />
          <div className={refRowClass}>
            <span>Tillage</span><span className="text-right">${ohioRates.tillage}/ac</span>
            <span>Planting</span><span className="text-right">${ohioRates.planting}/ac</span>
            <span>Spraying</span><span className="text-right">${ohioRates.spraying}/ac</span>
            <span>Harvest</span><span className="text-right">${ohioRates.harvest}/ac</span>
          </div>
        </div>

      </div>

      {/* Summary panel */}
      <div className="panel mt-4">

        <div className="panel-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-farm-subtle">Cost Summary</p>
        </div>

        <div className="px-4 sm:px-5 py-3">
          <ResultRow label="Seed Cost"      value={"$" + seedCost.toFixed(2)} />
          <ResultRow label="Nitrogen Cost"  value={"$" + nitrogenCost.toFixed(2)} />
          <ResultRow label="Operation Cost" value={"$" + totalOperationCost.toFixed(2)} />
        </div>

        <div className="px-4 sm:px-5 py-4 border-t border-farm-border"
             style={{ background: "rgba(31, 41, 55, 0.35)" }}>
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-xs font-medium text-farm-muted uppercase tracking-widest">Total Cost</span>
            <span className="text-2xl font-bold text-farm-accent">{"$" + totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-farm-subtle">Cost per Acre</span>
            <span className="text-sm font-semibold text-farm-accent-dim">{"$" + (totalCost / acres).toFixed(2)}</span>
          </div>
        </div>

      </div>

    </main>
  );
}
