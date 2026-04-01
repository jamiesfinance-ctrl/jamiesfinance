import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recommended Credit Cards — Jamie's Finance",
  description: "My personally recommended UK credit cards for travel rewards, cashback, and everyday spending. These are the cards I use.",
};

const cards = [
  {
    name: "British Airways American Express",
    tagline: "Earn Avios on everything you spend",
    image: "/ba-card.avif",
    href: "https://americanexpress.com/en-gb/referral/ba-classic-credit?ref=jAMESShSvU&XL=MIMNS",
    badge: "Travel Rewards",
    highlights: [
      "Earn 1 Avios per £1 spent",
      "Companion voucher after spending threshold",
      "No annual fee on the classic card",
      "Bonus Avios on sign-up",
    ],
    cta: "Apply with my link",
    note: "Referral link — you may receive bonus Avios when you apply through this link.",
  },
  {
    name: "Nectar American Express",
    tagline: "Turn everyday spending into Nectar points",
    image: "/nectar-card.avif",
    href: "https://americanexpress.com/en-gb/referral/nectar-credit?ref=jAMESSjN3G&XLINK=MYCP",
    badge: "Cashback & Points",
    highlights: [
      "Earn Nectar points on all spending",
      "Bonus points at Sainsbury's & partners",
      "No annual fee",
      "Welcome points on sign-up",
    ],
    cta: "Apply with my link",
    note: "Referral link — you may receive bonus Nectar points when you apply through this link.",
  },
  {
    name: "American Express Preferred Rewards Gold",
    tagline: "A premium card with serious perks",
    image: "/amex-gold-card.avif",
    href: null,
    badge: "Premium",
    highlights: [
      "Earn Membership Rewards points",
      "Airport lounge access",
      "Travel and purchase protections",
      "Generous welcome bonus",
    ],
    cta: "Referral link coming soon",
    note: "I'm adding my referral link shortly — check back soon.",
  },
];

export default function CreditCardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Personally Recommended", "By @jamiesfinance"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Credit Cards<br />I Actually Use
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            These are the cards in my wallet right now. Used responsibly — paid off in full every month — rewards credit cards are one of the best ways to earn free travel and cashback on spending you&apos;re already doing.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 py-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Important.</strong>{" "}
              Credit cards should only be used if you can pay the balance in full each month. Carrying a balance means paying interest, which will outweigh any rewards earned. This is not financial advice — always read the full terms before applying. Some links on this page are referral links; applying through them may earn both of us a bonus at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-8">
          {cards.map((card) => (
            <div key={card.name} className="rounded-3xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 24px -6px rgba(0,0,0,0.10)" }}>
              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Card image */}
                <div className="relative flex items-center justify-center p-8 min-h-[200px]"
                  style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}>
                  <div className="w-full max-w-[220px] aspect-[85.6/53.98] relative rounded-xl overflow-hidden"
                    style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)" }}>
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                </div>

                {/* Card details */}
                <div className="p-7 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest mb-3"
                        style={{ background: "var(--muted)", color: "var(--ink-40)", border: "1px solid var(--border)" }}>
                        {card.badge}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl leading-tight" style={{ color: "var(--foreground)" }}>
                        {card.name}
                      </h2>
                      <p className="text-sm mt-1" style={{ color: "var(--ink-60)" }}>{card.tagline}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 flex-1">
                    {card.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-60)" }}>
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5 6.5-7" stroke="var(--foreground)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t flex flex-col sm:flex-row sm:items-center gap-3" style={{ borderColor: "var(--border)" }}>
                    {card.href ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ background: "var(--foreground)", color: "var(--background)" }}
                      >
                        {card.cta}
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border"
                        style={{ borderColor: "var(--border)", color: "var(--ink-40)" }}>
                        {card.cta}
                      </span>
                    )}
                    <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.5 }}>
                      {card.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-16 px-6" style={{ background: "#141414" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-white mb-2">Looking for more ways to earn?</p>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                Bank switching bonuses are the other big one — some pay up to £200 with no direct debits required.
              </p>
            </div>
            <Link href="/bank-switching-offers"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
              style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.85)" }}>
              View bank switch offers
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
