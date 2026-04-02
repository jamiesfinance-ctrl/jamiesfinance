import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bank Account Reviews — Jamie's Finance",
  description: "Coming soon — honest reviews of UK current accounts covering switching bonuses, features, and everyday usability.",
};

export default function BankAccountReviewsPage() {
  return (
    <>
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/reviews" className="inline-flex items-center gap-2 text-xs font-semibold mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--ink-40)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Product Reviews
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              Coming Soon
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Bank Account<br />Reviews
          </h1>
          <p className="text-xl max-w-2xl prose-body mb-10">
            In-depth reviews of UK current accounts — covering switching bonuses, app quality, features, and who each account is actually best for. Coming soon.
          </p>
          <div className="rounded-2xl p-7 border max-w-lg" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>In the meantime</p>
            <p className="text-sm mb-5" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              Looking to earn cash from your bank account? The bank switching offers page lists all the best current account switch bonuses available right now.
            </p>
            <Link href="/bank-switching-offers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--foreground)", color: "var(--background)" }}>
              View switching offers
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
