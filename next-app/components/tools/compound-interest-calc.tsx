"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const CompoundChart = dynamic(() => import("./compound-chart"), {
  ssr: false,
  loading: () => <div className="h-72 rounded-2xl animate-pulse" style={{ background: "var(--muted)" }} />,
});

const FREQ_OPTIONS = [
  { label: "Daily",   value: 365 },
  { label: "Weekly",  value: 52  },
  { label: "Monthly", value: 12  },
  { label: "Yearly",  value: 1   },
];

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

/**
 * Annual compounding — growth applied once per year at `rate`%.
 * Contributions are made at `depositFreq` times per year.
 */
function calcCompound(
  deposit: number,
  years: number,
  rate: number,
  depositFreq: number,
  contribPerPeriod: number
) {
  const r = rate / 100;
  const yearlyContrib = contribPerPeriod * depositFreq;
  let balance = deposit;
  let invested = deposit;
  const labels: string[] = [];
  const balances: number[] = [];
  const investeds: number[] = [];

  for (let yr = 1; yr <= years; yr++) {
    balance = (balance + yearlyContrib) * (1 + r);
    invested += yearlyContrib;
    labels.push(`Year ${yr}`);
    balances.push(Math.round(balance));
    investeds.push(Math.round(invested));
  }
  return { balance, invested, labels, balances, investeds };
}

export function CompoundInterestCalc() {
  const [deposit, setDeposit] = useState(10000);
  const [depositInput, setDepositInput] = useState("10000");
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);
  const [freq, setFreq] = useState(12);
  const [contrib, setContrib] = useState(200);

  const yearsRef = useRef<HTMLInputElement>(null);
  const depositSliderRef = useRef<HTMLInputElement>(null);

  // Dynamic slider max — extends when deposit exceeds default cap
  const depositSliderMax = Math.max(100000, Math.ceil((deposit * 1.5) / 10000) * 10000);

  const updateSlider = (el: HTMLInputElement, val: number, min: number, max: number) => {
    const pct = Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
    el.style.setProperty("--pct", `${pct}%`);
  };

  useEffect(() => {
    if (depositSliderRef.current) updateSlider(depositSliderRef.current, deposit, 0, depositSliderMax);
    if (yearsRef.current) updateSlider(yearsRef.current, years, 1, 50);
  }, [deposit, years, depositSliderMax]);

  const handleDepositInput = (raw: string) => {
    setDepositInput(raw);
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n) && n >= 0) setDeposit(n);
  };

  const handleDepositSlider = (val: number) => {
    setDeposit(val);
    setDepositInput(String(val));
  };

  const result = calcCompound(deposit, years, rate, freq, contrib);
  const interest = result.balance - result.invested;
  const investedPct = result.balance > 0 ? Math.round((result.invested / result.balance) * 100) : 100;

  // Inflation-adjusted purchasing power (4% avg inflation)
  const INFLATION = 0.04;
  const inflationAdjusted = result.balance / Math.pow(1 + INFLATION, years);

  const freqLabel = FREQ_OPTIONS.find((f) => f.value === freq)?.label ?? "Monthly";

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
      {/* ── Inputs ── */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Your Numbers</h2>
        </div>

        <div className="p-7 space-y-7">

          {/* Initial deposit — text input + auto-scaling slider */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Initial Deposit
            </label>
            {/* Editable number field */}
            <div className="flex items-center rounded-xl overflow-hidden border mb-3" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
              <input
                type="number"
                min={0}
                step={500}
                value={depositInput}
                onChange={(e) => handleDepositInput(e.target.value)}
                onBlur={() => setDepositInput(String(deposit))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            {/* Slider — max extends to fit the typed value */}
            <input
              ref={depositSliderRef}
              type="range"
              min={0}
              max={depositSliderMax}
              step={500}
              value={deposit}
              onChange={(e) => handleDepositSlider(Number(e.target.value))}
            />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>£0</span>
              <span>{deposit > 100000 ? fmt(depositSliderMax) : "£100k"}</span>
            </div>
          </div>

          {/* Growth period */}
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

          {/* Deposit frequency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Deposit Frequency</label>
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

          {/* Contribution per period */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              {freqLabel} Contribution
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

      {/* ── Results ── */}
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Final Balance — always dark card, always white text */}
          <div className="rounded-2xl p-5 col-span-3 sm:col-span-1" style={{ background: "#141414" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.50)" }}>
              Final Balance
            </p>
            <p className="font-display text-3xl leading-none" style={{ color: "#ffffff" }}>
              {fmt(result.balance)}
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.40)" }}>
              after {years} year{years !== 1 ? "s" : ""}
            </p>
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

        {/* Inflation note */}
        <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
            Inflation Adjustment
          </p>
          <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            Assuming inflation stays at an average of 4%, your final balance of{" "}
            <strong style={{ color: "var(--foreground)" }}>{fmt(result.balance)}</strong>{" "}
            would have the purchasing power of approximately{" "}
            <strong style={{ color: "var(--foreground)" }}>{fmt(inflationAdjusted)}</strong>{" "}
            in today&apos;s money after {years} year{years !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>
    </div>
  );
}
