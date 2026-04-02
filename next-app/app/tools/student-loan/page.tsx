import type { Metadata } from "next";
import Link from "next/link";
import { StudentLoanSim } from "@/components/tools/student-loan-sim";

export const metadata: Metadata = {
  title: "Student Loan Repayment Simulator — Jamie's Finance",
  description: "See how long your student loan will last, how much you'll repay in total, and whether you're likely to pay it off before the write-off date. UK Plans 1, 2, 4 and 5.",
};

export default function StudentLoanPage() {
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
            {["2025/26 Rates", "Plans 1, 2, 4 & 5", "Free Tool"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-4" style={{ color: "var(--foreground)" }}>
            Student Loan<br />Repayment<br />Simulator
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            Enter your balance, salary, and plan type to see your monthly repayment, total amount repaid, and exactly when your loan gets paid off — or written off.
          </p>
        </div>
      </section>

      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <StudentLoanSim />
        </div>
      </section>

      {/* The write-off reality */}
      <section className="py-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: "var(--foreground)" }}>
            The write-off reality
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Most Plan 2 graduates won't repay in full",
                body: "The Institute for Fiscal Studies estimates that around 75% of Plan 2 borrowers will not pay off their student loan in full before the 30-year write-off. For many graduates, the question isn't 'when will I pay this off?' but 'how much will get written off?'",
              },
              {
                title: "You only repay 9% above the threshold",
                body: "Your repayment is 9% of earnings above the threshold — not 9% of your total salary. If you earn £32,295 on Plan 2, you repay 9% of £5,000 (£32,295 − £27,295) = £450/year, or £37.50/month. Below the threshold, you pay nothing.",
              },
              {
                title: "Interest adds up — but write-off cancels it",
                body: "Plan 2 and Plan 5 accrue interest at RPI + 3%, which means your balance can grow significantly. However, if you're likely to have the loan written off anyway, the interest doesn't change your out-of-pocket cost. Making extra repayments only makes sense if you're on track to pay it off before write-off.",
              },
              {
                title: "The written-off amount is not taxable",
                body: "When your student loan is written off, HMRC does not treat the cancelled amount as income. You won't receive a tax bill for the amount forgiven. It simply disappears.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-5 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
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
