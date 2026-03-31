import type { Metadata } from "next";
import { CompoundInterestCalc } from "@/components/tools/compound-interest-calc";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Jamie's Finance",
  description: "See how your money grows over time with our free interactive compound interest calculator.",
};

export default function CompoundInterestPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden grain pt-32 pb-16 px-6 text-center"
        style={{ background: "var(--card)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
              Free Tool
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-[5rem] leading-none mb-5" style={{ color: "var(--foreground)" }}>
            Compound Interest<br />Calculator
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            See how your money grows over time. Adjust your deposit, rate, and contributions to explore different scenarios.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <CompoundInterestCalc />
        </div>
      </section>
    </>
  );
}
