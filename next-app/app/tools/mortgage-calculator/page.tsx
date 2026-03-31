import type { Metadata } from "next";
import { MortgageCalc } from "@/components/tools/mortgage-calc";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Jamie's Finance",
  description: "Calculate monthly payments, total interest, and see your full amortisation schedule.",
};

export default function MortgageCalculatorPage() {
  return (
    <>
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
            Mortgage<br />Calculator
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            Calculate monthly payments, total interest, and see your full amortisation schedule. Includes overpayment modelling and CSV export.
          </p>
        </div>
      </section>

      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-7xl mx-auto">
          <MortgageCalc />
        </div>
      </section>
    </>
  );
}
