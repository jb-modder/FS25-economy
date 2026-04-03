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
    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
      {title}
    </h2>
  );
}

function Field({ label, unit, children }: { label: string; unit?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{unit && <span className="text-gray-400 font-normal ml-1">({unit})</span>}
      </label>
      {children}
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

const inputClass = "border border-gray-300 rounded p-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-400";

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
    <main className="p-8 max-w-2xl mx-auto text-gray-900">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Field Calculator</p>
          <h1 className="text-2xl font-bold">Field 1</h1>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className={`${inputClass} w-28`}
        >
          {Object.keys(farmData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Inputs */}
      <div className="space-y-6">

        {/* General */}
        <div className="border border-gray-200 rounded p-4 space-y-4">
          <SectionHeader title="Field" />
          <Field label="Acres">
            <input type="number" value={acres} onChange={(e) => setAcres(Number(e.target.value))} className={inputClass} />
          </Field>
        </div>

        {/* Seed */}
        <div className="border border-gray-200 rounded p-4 space-y-4">
          <SectionHeader title="Seed" />
          <Field label="Seed Population" unit="seeds/ac">
            <input type="number" value={seedRate} onChange={(e) => setSeedRate(Number(e.target.value))} className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500 pt-1">
            <span>Price per bag</span><span className="text-right">${seedPrice.toFixed(2)}</span>
            <span>Seeds per bag</span><span className="text-right">{seedsPerBag.toLocaleString()}</span>
          </div>
        </div>

        {/* Nitrogen */}
        <div className="border border-gray-200 rounded p-4 space-y-4">
          <SectionHeader title="Nitrogen" />
          <Field label="Application Rate" unit="lb/ac">
            <input type="number" value={nitrogenRate} onChange={(e) => setNitrogenRate(Number(e.target.value))} className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500 pt-1">
            <span>Price per lb</span><span className="text-right">${nitrogenPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Operations */}
        <div className="border border-gray-200 rounded p-4">
          <SectionHeader title="Operations (Ohio State Custom Rates)" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500">
            <span>Tillage</span><span className="text-right">${ohioRates.tillage}/ac</span>
            <span>Planting</span><span className="text-right">${ohioRates.planting}/ac</span>
            <span>Spraying</span><span className="text-right">${ohioRates.spraying}/ac</span>
            <span>Harvest</span><span className="text-right">${ohioRates.harvest}/ac</span>
          </div>
        </div>

      </div>

      {/* Results */}
      <div className="mt-8 border border-gray-200 rounded p-4">
        <SectionHeader title="Summary" />
        <ResultRow label="Total Seeds" value={totalSeeds.toLocaleString() + " seeds"} />
        <ResultRow label="Seed Bags" value={seedBags.toFixed(2) + " bags"} />
        <ResultRow label="Seed Cost" value={"$" + seedCost.toFixed(2)} />
        <ResultRow label="Total Nitrogen" value={totalNitrogen.toLocaleString() + " lbs"} />
        <ResultRow label="Nitrogen Cost" value={"$" + nitrogenCost.toFixed(2)} />
        <ResultRow label="Operation Cost" value={"$" + totalOperationCost.toFixed(2)} />
        <div className="flex justify-between py-3 mt-1 border-t-2 border-gray-300">
          <span className="text-sm font-semibold text-gray-800">Total Cost</span>
          <span className="text-sm font-semibold text-gray-900">{"$" + totalCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pb-1">
          <span className="text-sm text-gray-500">Cost per Acre</span>
          <span className="text-sm text-gray-700">{"$" + (totalCost / acres).toFixed(2)}</span>
        </div>
      </div>

    </main>
  );
}
