import type { Metadata } from "next";
import Link from "next/link";
import { TakeHomePayCalc } from "@/components/tools/take-home-pay-calc";

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator — Jamie's Finance",
  description: "See exactly what you take home after tax. Enter your UK salary and student loan plan for a full 2025/26 breakdown: income tax, National Insurance, student loan, and net pay.",
};

export default function TakeHomePayPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--ink-40)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All Tools
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {["2025/26 Tax Year", "Free Tool", "PAYE"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-4" style={{ color: "var(--foreground)" }}>
            Take-Home Pay<br />Calculator
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            Enter your annual salary and student loan plan. Instantly see your monthly and annual breakdown — income tax, National Insurance, student loan, and actual take-home pay.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <TakeHomePayCalc />
        </div>
      </section>

      {/* What these numbers mean */}
      <section className="py-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>
              What these numbers mean
            </h2>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ color: "var(--ink-40)", borderColor: "var(--border)", background: "var(--muted)" }}>
              True as of April 2026 · subject to change
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                color: "#dc2626",
                title: "Income Tax",
                body: "You pay 20% on income between £12,571 and £50,270 (basic rate), 40% from £50,271 to £125,140 (higher rate), and 45% above that (additional rate). You pay 0% on the first £12,570 — that's your Personal Allowance. It reduces by £1 for every £2 you earn over £100,000.",
              },
              {
                color: "#f97316",
                title: "National Insurance",
                body: "Employee NI is 0% up to £12,570, 8% on earnings between £12,570 and £50,270, and 2% above £50,270. It's separate from income tax and funds the NHS, state pension, and benefits — but the rate is lower than income tax.",
              },
              {
                color: "#7c3aed",
                title: "Student Loan",
                body: "You repay 9% of earnings above your plan's threshold — not 9% of your total salary. So if you earn £5,000 above the threshold, you pay £450/year (£37.50/month). Nothing is owed if your salary is below the threshold.",
              },
              {
                color: "#16a34a",
                title: "Net Take-Home",
                body: "This is what actually lands in your bank account. After income tax, NI, and any student loan deductions, this is the number that matters for budgeting. Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
              },
              {
                color: "#2563eb",
                title: "Effective Rate",
                body: "Your effective rate is the percentage of your total salary that goes on all deductions combined. It's almost always lower than your marginal tax rate (the rate on your last pound of income) because lower earnings are taxed at lower rates.",
              },
              {
                color: "#ca8a04",
                title: "Personal Allowance",
                body: "The first £12,570 of your income is completely tax-free in 2025/26. If you earn over £100,000, this reduces — gone entirely at £125,140. This is why the 100k+ effective tax rate is so high.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-5 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: item.color }} />
                <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
