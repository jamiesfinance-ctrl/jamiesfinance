import type { Metadata } from "next";
import Link from "next/link";
import { BudgetBuilder } from "@/components/tools/budget-builder";

export const metadata: Metadata = {
  title: "Budget Builder — Jamie's Finance",
  description: "Build your monthly budget using the 50/30/20 rule. Enter your take-home pay and allocate spending across needs, wants, and savings.",
};

export default function BudgetBuilderPage() {
  return (
    <>
      <section className="relative overflow-hidden grain pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--ink-40)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All Tools
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {["50/30/20 Rule", "Monthly Budget", "Free Tool"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-4" style={{ color: "var(--foreground)" }}>
            Budget<br />Builder
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            Enter your monthly take-home pay and split it across needs, wants, and savings. Adjust percentages and categories to build a budget that actually fits your life.
          </p>
        </div>
      </section>

      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <BudgetBuilder />
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: "var(--foreground)" }}>
            The 50/30/20 rule explained
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                pct: "50%",
                label: "Needs",
                color: "#2563eb",
                body: "Essential expenses: rent, utilities, groceries, transport, insurance, and minimum debt payments. These are non-negotiable — you need them to function. If your needs consistently exceed 50%, the answer is usually to increase income or find ways to reduce fixed costs like rent.",
              },
              {
                pct: "30%",
                label: "Wants",
                color: "#f97316",
                body: "Lifestyle spending: eating out, subscriptions, clothes, hobbies, holidays. These improve your quality of life but aren't essential. This is also the easiest category to cut when money is tight. Ask yourself: 'Would I rather have this now, or be £200 closer to my savings goal?'",
              },
              {
                pct: "20%",
                label: "Savings",
                color: "#16a34a",
                body: "Future you: emergency fund, ISA contributions, pension top-ups, house deposit. Pay yourself first — move this money out of your current account on payday, before you can spend it. Even £50/month into a Stocks & Shares ISA started at 21 can grow significantly by retirement.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-6 border" style={{ background: "var(--background)", borderColor: "var(--border)", borderTop: `3px solid ${item.color}` }}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl" style={{ color: item.color }}>{item.pct}</span>
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>{item.label}</span>
                </div>
                <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.8 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
