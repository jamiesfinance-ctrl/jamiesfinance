"use client";

import { useState, useEffect, useRef } from "react";
import { calcTakeHome, STUDENT_LOAN_OPTIONS, type StudentLoanPlan } from "@/lib/take-home-calc";

function fmt(n: number) {
  return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDec(n: number) {
  return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const SALARY_PRESETS = [
  { label: "Min wage", value: 23_795 }, // ~£11.44/hr × 40hrs × 52
  { label: "£30k",   value: 30_000 },
  { label: "£40k",   value: 40_000 },
  { label: "£50k",   value: 50_000 },
  { label: "£75k",   value: 75_000 },
];

type Breakdown = {
  label: string;
  annual: number;
  monthly: number;
  color: string;
  pct?: number;
};

export function TakeHomePayCalc() {
  const [salary, setSalary] = useState(30_000);
  const [salaryInput, setSalaryInput] = useState("30000");
  const [plan, setPlan] = useState<StudentLoanPlan>("none");
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  const sliderRef = useRef<HTMLInputElement>(null);
  const SLIDER_MAX = 200_000;

  const result = calcTakeHome(salary, plan);

  // Update slider fill
  useEffect(() => {
    if (sliderRef.current) {
      const pct = Math.min(100, (salary / SLIDER_MAX) * 100);
      sliderRef.current.style.setProperty("--pct", `${pct}%`);
    }
  }, [salary]);

  const handleSalaryInput = (raw: string) => {
    setSalaryInput(raw);
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n) && n >= 0) setSalary(n);
  };

  const breakdown: Breakdown[] = [
    {
      label: "Net Take-Home",
      annual: result.netAnnual,
      monthly: result.netMonthly,
      color: "#16a34a",
      pct: salary > 0 ? Math.round((result.netAnnual / salary) * 100) : 100,
    },
    {
      label: "Income Tax",
      annual: result.incomeTaxAnnual,
      monthly: result.incomeTaxMonthly,
      color: "#dc2626",
      pct: salary > 0 ? Math.round((result.incomeTaxAnnual / salary) * 100) : 0,
    },
    {
      label: "National Insurance",
      annual: result.niAnnual,
      monthly: result.niMonthly,
      color: "#f97316",
      pct: salary > 0 ? Math.round((result.niAnnual / salary) * 100) : 0,
    },
    ...(result.studentLoanAnnual > 0 ? [{
      label: `Student Loan (${result.studentLoanLabel})`,
      annual: result.studentLoanAnnual,
      monthly: result.studentLoanMonthly,
      color: "#7c3aed",
      pct: salary > 0 ? Math.round((result.studentLoanAnnual / salary) * 100) : 0,
    }] : []),
  ];

  const val = (b: Breakdown) => period === "monthly" ? b.monthly : b.annual;

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">

      {/* ── Inputs ── */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Your Details</h2>
          <p className="text-xs mt-1" style={{ color: "var(--ink-40)" }}>2025/26 tax year rates</p>
        </div>

        <div className="p-7 space-y-7">
          {/* Annual salary */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Annual Salary
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border mb-3" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
              <input
                type="number"
                min={0}
                step={1000}
                value={salaryInput}
                onChange={(e) => handleSalaryInput(e.target.value)}
                onBlur={() => setSalaryInput(String(salary))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            <input
              ref={sliderRef}
              type="range"
              min={0}
              max={SLIDER_MAX}
              step={1000}
              value={salary}
              onChange={(e) => { const v = Number(e.target.value); setSalary(v); setSalaryInput(String(v)); }}
            />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>£0</span><span>£200k</span>
            </div>
          </div>

          {/* Salary presets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Quick Select
            </label>
            <div className="flex flex-wrap gap-2">
              {SALARY_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => { setSalary(p.value); setSalaryInput(String(p.value)); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background: salary === p.value ? "var(--foreground)" : "transparent",
                    color: salary === p.value ? "var(--background)" : "var(--ink-60)",
                    borderColor: salary === p.value ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Student loan plan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Student Loan Plan
            </label>
            <div className="space-y-2">
              {STUDENT_LOAN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPlan(opt.value)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all"
                  style={{
                    background: plan === opt.value ? "var(--foreground)" : "transparent",
                    borderColor: plan === opt.value ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: plan === opt.value ? "var(--background)" : "var(--foreground)" }}>
                    {opt.label}
                  </span>
                  <span className="text-xs" style={{ color: plan === opt.value ? `color-mix(in srgb, var(--background) 70%, transparent)` : "var(--ink-40)" }}>
                    {opt.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-5">
        {/* Period toggle */}
        <div className="flex rounded-xl overflow-hidden border self-start w-fit" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-5 py-2 text-sm font-semibold capitalize transition-all"
              style={{
                background: period === p ? "var(--foreground)" : "transparent",
                color: period === p ? "var(--background)" : "var(--ink-60)",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Hero take-home card */}
        <div className="rounded-2xl p-6" style={{ background: "#141414" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            {period === "monthly" ? "Monthly" : "Annual"} Take-Home
          </p>
          <p className="font-display text-5xl leading-none text-white mb-1">
            {period === "monthly" ? fmtDec(result.netMonthly) : fmt(result.netAnnual)}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>
            {result.effectiveTaxRate}% effective deduction rate
          </p>
        </div>

        {/* Stacked bar */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--ink-40)" }}>Where your salary goes</p>
          <div className="h-3 rounded-full overflow-hidden flex mb-4" style={{ background: "var(--muted)" }}>
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="transition-all duration-500"
                style={{ width: `${b.pct}%`, background: b.color }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {breakdown.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-60)" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                {b.label} ({b.pct}%)
              </span>
            ))}
          </div>
        </div>

        {/* Full breakdown table */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Breakdown</th>
                <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                  {period === "monthly" ? "Monthly" : "Annual"}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Gross Salary", annual: result.grossAnnual, monthly: result.grossMonthly, color: "var(--foreground)", bold: false },
                { label: "— Income Tax", annual: -result.incomeTaxAnnual, monthly: -result.incomeTaxMonthly, color: "#dc2626", bold: false },
                { label: "— National Insurance", annual: -result.niAnnual, monthly: -result.niMonthly, color: "#f97316", bold: false },
                ...(result.studentLoanAnnual > 0 ? [{
                  label: `— Student Loan (${result.studentLoanLabel})`,
                  annual: -result.studentLoanAnnual,
                  monthly: -result.studentLoanMonthly,
                  color: "#7c3aed",
                  bold: false,
                }] : []),
                { label: "Net Take-Home", annual: result.netAnnual, monthly: result.netMonthly, color: "#16a34a", bold: true },
              ].map((row, i) => (
                <tr key={row.label} style={{ borderBottom: "1px solid var(--border)", background: row.bold ? `#16a34a0d` : undefined }}>
                  <td className="px-5 py-3.5 text-sm" style={{ color: row.color, fontWeight: row.bold ? 700 : 400 }}>
                    {row.label}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-right" style={{ color: row.color }}>
                    {row.annual < 0
                      ? `−${fmtDec(period === "monthly" ? row.monthly : row.annual)}`
                      : fmtDec(period === "monthly" ? row.monthly : row.annual)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key facts */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Personal Allowance", value: fmt(result.personalAllowance), note: "Tax-free income" },
            { label: "Effective Rate", value: `${result.effectiveTaxRate}%`, note: "All deductions combined" },
            { label: "Hourly Rate", value: `£${(result.netAnnual / 52 / 37.5).toFixed(2)}`, note: "37.5hr week, net" },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl p-4" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--ink-40)" }}>{f.label}</p>
              <p className="font-display text-2xl" style={{ color: "var(--foreground)" }}>{f.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--ink-40)" }}>{f.note}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-4 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--ink-60)" }}>2025/26 tax year.</strong> Calculations are based on standard PAYE rates and do not account for pension contributions, employer schemes, blind person&apos;s allowance, marriage allowance, or other deductions. For illustration only — not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
