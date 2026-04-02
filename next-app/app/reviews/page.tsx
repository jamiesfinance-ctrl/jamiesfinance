import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Reviews — Jamie's Finance",
  description: "Honest, scored reviews of financial products — credit cards, bank accounts, and more.",
};

const categories = [
  {
    href: "/credit-cards",
    title: "Credit Card Reviews",
    desc: "From the best free Amex to beginner-friendly Mastercards — scored and reviewed with honest opinions on who each card is actually for.",
    count: "7 cards reviewed",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="3" y="7" width="22" height="15" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 12h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 18h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="21" cy="18" r="2" fill="currentColor"/>
      </svg>
    ),
    topPick: "Amex Gold — 10/10",
    topPickColor: "#16a34a",
  },
  {
    href: "/bank-account-reviews",
    title: "Bank Account Reviews",
    desc: "Which current account is actually worth your time? Reviews covering switching bonuses, features, app quality, and everyday usability.",
    count: "Coming soon",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M4 12L14 5l10 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="7" y="12" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 22v-5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    topPick: "More reviews coming",
    topPickColor: "var(--ink-40)",
  },
];

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              By @jamiesfinance
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Product<br />Reviews
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            Honest, scored reviews of financial products — no sponsored opinions, no fluff. Just what&apos;s actually worth your time and money.
          </p>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="px-6 py-4" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
            These are personal opinions and financial education — not financial advice. Some links are referral or friend links.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:opacity-70" style={{ color: "var(--ink-40)" }}>Affiliate disclosure</Link>
            {" "}·{" "}
            <Link href="/disclaimer" className="underline hover:opacity-70" style={{ color: "var(--ink-40)" }}>Full disclaimer</Link>
          </p>
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}
              className="block rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "var(--muted)", color: "var(--ink-60)" }}>
                {cat.icon}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl mb-3 leading-tight" style={{ color: "var(--foreground)" }}>{cat.title}</h2>
              <p className="text-sm mb-6" style={{ color: "var(--ink-60)", lineHeight: 1.75 }}>{cat.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: `${cat.topPickColor}18`, color: cat.topPickColor, border: `1px solid ${cat.topPickColor}40` }}>
                  {cat.topPick}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--ink-40)" }}>{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
