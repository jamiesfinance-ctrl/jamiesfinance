"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const CompoundChart = dynamic(() => import("./compound-chart"), {
  ssr: false,
  loading: () => <div className="h-72 rounded-2xl animate-pulse" style={{ background: "var(--muted)" }} />,
});

const FREQ_OPTIONS = [
  { label: "Daily", value: 365 },
  { label: "Weekly", value: 52 },
  { label: "Monthly", value: 12 },
  { label: "Yearly", value: 1 },
];

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function calcCompound(deposit: number, years: number, rate: number, freq: number, contrib: number) {
  const rpp = rate / 100 / freq;
  let balance = deposit;
  let invested = deposit;
  const labels: string[] = [];
  const balances: number[] = [];
  const investeds: number[] = [];

  for (let p = 1; p <= years * freq; p++) {
    balance = balance * (1 + rpp) + contrib;
    invested += contrib;
    if (p % freq === 0) {
      const yr = p / freq;
      labels.push(`Year ${yr}`);
      balances.push(Math.round(balance));
      investeds.push(Math.round(invested));
    }
  }
  return { balance, invested, labels, balances, investeds };
}

export function CompoundInterestCalc() {
  const [deposit, setDeposit] = useState(10000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);
  const [freq, setFreq] = useState(12);
  const [contrib, setContrib] = useState(200);

  const depositRef = useRef<HTMLInputElement>(null);
  const yearsRef = useRef<HTMLInputElement>(null);

  const updateSlider = (el: HTMLInputElement, val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    el.style.setProperty("--pct", `${pct}%`);
  };

  useEffect(() => {
    if (depositRef.current) updateSlider(depositRef.current, deposit, 0, 100000);
    if (yearsRef.current) updateSlider(yearsRef.current, years, 1, 50);
  }, [deposit, years]);

  const result = calcCompound(deposit, years, rate, freq, contrib);
  const interest = result.balance - result.invested;
  const investedPct = Math.round((result.invested / result.balance) * 100);

  const freqLabel = FREQ_OPTIONS.find((f) => f.value === freq)?.label.toLowerCase() ?? "monthly";

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
      {/* Inputs */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Your Numbers</h2>
        </div>

        <div className="p-7 space-y-7">
          {/* Initial deposit slider */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Initial Deposit</label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{fmt(deposit)}</span>
            </div>
            <input
              ref={depositRef}
              type="range" min={0} max={100000} step={500}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>£0</span><span>£100k</span>
            </div>
          </div>

          {/* Growth period slider */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Growth Period</label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{years} yr{years !== 1 ? "s" : ""}</span>
            </div>
            <input
              ref={yearsRef}
              type="range" min={1} max={50} step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>1 yr</span><span>50 yrs</span>
            </div>
          </div>

          {/* Annual return rate */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Annual Return Rate</label>
            <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <input
                type="number" min={0} max={50} step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>%</span>
            </div>
          </div>

          {/* Compounding frequency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Compounding Frequency</label>
            <div className="grid grid-cols-4 gap-2">
              {FREQ_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFreq(f.value)}
                  className="py-2 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background: freq === f.value ? "var(--foreground)" : "transparent",
                    color: freq === f.value ? "var(--background)" : "var(--ink-60)",
                    borderColor: freq === f.value ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Regular contribution */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              {FREQ_OPTIONS.find((f) => f.value === freq)?.label} Contribution
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
              <input
                type="number" min={0} step={10}
                value={contrib}
                onChange={(e) => setContrib(Number(e.target.value))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 col-span-3 sm:col-span-1" style={{ background: "var(--foreground)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>Final Balance</p>
            <p className="font-display text-3xl leading-none" style={{ color: "#fff" }}>{fmt(result.balance)}</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.40)" }}>after {years} years</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Total Invested</p>
            <p className="font-display text-2xl leading-none" style={{ color: "var(--foreground)" }}>{fmt(result.invested)}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Interest Earned</p>
            <p className="font-display text-2xl leading-none" style={{ color: "var(--foreground)" }}>{fmt(interest)}</p>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex justify-between text-xs font-semibold mb-3" style={{ color: "var(--ink-40)" }}>
            <span>Invested {investedPct}%</span>
            <span>Growth {100 - investedPct}%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden flex" style={{ background: "var(--muted)" }}>
            <div className="transition-all duration-700 rounded-full" style={{ width: `${investedPct}%`, background: "var(--ink-40)" }} />
            <div className="transition-all duration-700 flex-1 rounded-full" style={{ background: "var(--foreground)" }} />
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <CompoundChart
            labels={result.labels}
            balances={result.balances}
            investeds={result.investeds}
          />
        </div>
      </div>
    </div>
  );
}
