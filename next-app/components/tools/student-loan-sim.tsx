"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  simulateStudentLoan,
  PLAN_INFO,
  type LoanPlan,
} from "@/lib/student-loan-calc";

const StudentLoanChart = dynamic(() => import("./student-loan-chart"), {
  ssr: false,
  loading: () => <div className="h-64 rounded-2xl animate-pulse" style={{ background: "var(--muted)" }} />,
});

function fmt(n: number) {
  return "£" + Math.round(Math.abs(n)).toLocaleString("en-GB");
}

const PLAN_OPTIONS = (Object.keys(PLAN_INFO) as LoanPlan[]).map((k) => ({
  value: k,
  label: PLAN_INFO[k].label,
  threshold: PLAN_INFO[k].threshold,
  writeOff: PLAN_INFO[k].writeOffNote,
}));

export function StudentLoanSim() {
  const [balance, setBalance]         = useState(45_000);
  const [balanceInput, setBalanceInput] = useState("45000");
  const [salary, setSalary]           = useState(28_000);
  const [salaryInput, setSalaryInput]   = useState("28000");
  const [growth, setGrowth]           = useState(3);
  const [plan, setPlan]               = useState<LoanPlan>("plan2");
  const [yearsFrom, setYearsFrom]     = useState(0);

  const balSliderRef = useRef<HTMLInputElement>(null);
  const salSliderRef = useRef<HTMLInputElement>(null);
  const BALANCE_MAX  = 120_000;
  const SALARY_MAX   = 120_000;

  useEffect(() => {
    const pct = (v: number, max: number) => Math.min(100, (v / max) * 100);
    if (balSliderRef.current) balSliderRef.current.style.setProperty("--pct", `${pct(balance, BALANCE_MAX)}%`);
    if (salSliderRef.current) salSliderRef.current.style.setProperty("--pct", `${pct(salary, SALARY_MAX)}%`);
  }, [balance, salary]);

  const result = simulateStudentLoan(balance, salary, growth, plan, yearsFrom);
  const info   = PLAN_INFO[plan];

  const handleBalance = (raw: string) => {
    setBalanceInput(raw);
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n) && n >= 0) setBalance(n);
  };

  const handleSalary = (raw: string) => {
    setSalaryInput(raw);
    const n = parseInt(raw.replace(/,/g, ""), 10);
    if (!isNaN(n) && n >= 0) setSalary(n);
  };

  const paidOff = result.paidOffYear !== null;
  const eventYear = result.paidOffYear ?? result.writeOffYear;

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">

      {/* ── Inputs ── */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Your Loan</h2>
          <p className="text-xs mt-1" style={{ color: "var(--ink-40)" }}>2025/26 repayment rates</p>
        </div>

        <div className="p-7 space-y-7">

          {/* Loan balance */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Current Loan Balance
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border mb-3" style={{ borderColor: "var(--border)" }}>
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
              <input
                type="number" min={0} step={1000}
                value={balanceInput}
                onChange={(e) => handleBalance(e.target.value)}
                onBlur={() => setBalanceInput(String(balance))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            <input ref={balSliderRef} type="range" min={0} max={BALANCE_MAX} step={500}
              value={balance}
              onChange={(e) => { const v = Number(e.target.value); setBalance(v); setBalanceInput(String(v)); }} />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>£0</span><span>£120k</span>
            </div>
          </div>

          {/* Current salary */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Current Annual Salary
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border mb-3" style={{ borderColor: "var(--border)" }}>
              <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
              <input
                type="number" min={0} step={1000}
                value={salaryInput}
                onChange={(e) => handleSalary(e.target.value)}
                onBlur={() => setSalaryInput(String(salary))}
                className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            <input ref={salSliderRef} type="range" min={0} max={SALARY_MAX} step={500}
              value={salary}
              onChange={(e) => { const v = Number(e.target.value); setSalary(v); setSalaryInput(String(v)); }} />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>£0</span><span>£120k</span>
            </div>
          </div>

          {/* Salary growth */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                Annual Salary Growth
              </label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{growth}%</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 2, 3, 5, 8].map((g) => (
                <button key={g}
                  onClick={() => setGrowth(g)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background: growth === g ? "var(--foreground)" : "transparent",
                    color: growth === g ? "var(--background)" : "var(--ink-60)",
                    borderColor: growth === g ? "var(--foreground)" : "var(--border)",
                  }}>
                  {g === 0 ? "Flat" : `${g}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Plan type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>
              Loan Plan
            </label>
            <div className="space-y-2">
              {PLAN_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => setPlan(opt.value)}
                  className="w-full text-left px-4 py-3 rounded-xl border transition-all"
                  style={{
                    background: plan === opt.value ? "var(--foreground)" : "transparent",
                    borderColor: plan === opt.value ? "var(--foreground)" : "var(--border)",
                  }}>
                  <span className="text-sm font-semibold block" style={{ color: plan === opt.value ? "var(--background)" : "var(--foreground)" }}>
                    {opt.label}
                  </span>
                  <span className="text-xs" style={{ color: plan === opt.value ? `rgba(${plan === opt.value ? "248,248,248" : "0,0,0"},0.55)` : "var(--ink-40)" }}>
                    Threshold {fmt(opt.threshold)} · {info.writeOffYears}yr write-off
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Years since graduation */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                Years Since Graduation
              </label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{yearsFrom} yr{yearsFrom !== 1 ? "s" : ""}</span>
            </div>
            <input type="range" min={0} max={info.writeOffYears - 1} step={1}
              value={yearsFrom}
              onChange={(e) => setYearsFrom(Number(e.target.value))} />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
              <span>Just graduated</span><span>{info.writeOffYears - 1} yrs</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Results ── */}
      <div className="space-y-5">

        {/* Outcome hero card */}
        <div className="rounded-2xl p-6" style={{ background: paidOff ? "#14411e" : "#1a1a2e" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: paidOff ? "rgba(134,239,172,0.6)" : "rgba(165,180,252,0.6)" }}>
            {paidOff ? "Loan Paid Off" : "Loan Written Off"}
          </p>
          <p className="font-display text-4xl leading-none mb-1"
            style={{ color: paidOff ? "#86efac" : "#a5b4fc" }}>
            Year {eventYear}
          </p>
          <p className="text-sm" style={{ color: paidOff ? "rgba(134,239,172,0.55)" : "rgba(165,180,252,0.55)" }}>
            {paidOff
              ? `Fully repaid in ${eventYear} year${eventYear !== 1 ? "s" : ""}`
              : `${fmt(result.writtenOffAmount)} written off after ${info.writeOffYears} years`}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Monthly Now",    value: result.monthlyRepaymentNow > 0 ? fmt(result.monthlyRepaymentNow) : "£0", sub: "current repayment" },
            { label: "Total Repaid",   value: fmt(result.totalRepaid), sub: "over lifetime" },
            { label: "Interest Paid",  value: fmt(result.totalInterestPaid), sub: "approximate" },
            { label: "Written Off",    value: result.writtenOffAmount > 0 ? fmt(result.writtenOffAmount) : "£0", sub: "remaining balance" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--ink-40)" }}>{s.label}</p>
              <p className="font-display text-xl leading-none mb-0.5" style={{ color: "var(--foreground)" }}>{s.value}</p>
              <p className="text-xs" style={{ color: "var(--ink-40)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Balance & Repayments Over Time</p>
            <div className="flex items-center gap-4">
              {[
                { color: "#dc2626", label: "Balance" },
                { color: "#16a34a", label: "Total repaid", dashed: true },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-40)" }}>
                  <span className="w-5 h-px flex-shrink-0" style={{ background: l.color, display: "inline-block", borderTop: l.dashed ? `2px dashed ${l.color}` : `2px solid ${l.color}` }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <StudentLoanChart
            data={result.yearlyData}
            writeOffYear={result.writeOffYear}
            paidOffYear={result.paidOffYear}
          />
        </div>

        {/* Year-by-year table — first 10 years */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Year-by-Year Breakdown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                  {["Year", "Salary", "Monthly Repayment", "Annual Interest", "Balance"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.yearlyData.slice(0, 20).map((row) => (
                  <tr key={row.year} style={{ borderBottom: "1px solid var(--border)", background: row.year === eventYear ? (paidOff ? "#16a34a0d" : "#7c3aed0d") : undefined }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>
                      {row.year === 0 ? "Now" : `Yr ${row.year}`}
                      {row.year === eventYear && (
                        <span className="ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ background: paidOff ? "#16a34a22" : "#7c3aed22", color: paidOff ? "#16a34a" : "#7c3aed" }}>
                          {paidOff ? "Paid off" : "Write-off"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--ink-60)" }}>{fmt(row.salary)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--ink-60)" }}>
                      {row.annualRepayment > 0 ? fmt(Math.round(row.annualRepayment / 12)) : "—"}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#dc2626" }}>
                      {row.annualInterest > 0 ? fmt(row.annualInterest) : "—"}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: row.balance === 0 ? "#16a34a" : "var(--foreground)" }}>
                      {row.balance === 0 && row.year > 0 ? "£0 ✓" : fmt(row.balance)}
                    </td>
                  </tr>
                ))}
                {result.yearlyData.length > 20 && (
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td colSpan={5} className="px-4 py-3 text-xs text-center" style={{ color: "var(--ink-40)" }}>
                      Showing first 20 years — chart shows full trajectory
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Context note */}
        <div className="rounded-2xl p-4 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--ink-60)" }}>How this works.</strong> You repay 9% of earnings above your plan threshold — not 9% of your total salary. Interest accrues on your balance year-round. Interest rates shown are approximate 2025 figures and are subject to change. If your loan isn&apos;t paid off by the write-off date, the remaining balance is cancelled — you don&apos;t pay it. This is for illustration only, not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
