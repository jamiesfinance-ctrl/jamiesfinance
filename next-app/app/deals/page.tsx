"use client";

import Link from "next/link";
import { useState } from "react";
import { DEALS, CATEGORIES, type Deal } from "@/data/deals";

const CATEGORY_ICONS: Record<Deal["category"], React.ReactNode> = {
  "bank-switching": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 8L9 3l7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="8" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 15v-3.5h4V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  investing: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polyline points="2,14 6,9 10,11 16,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="4" r="1.5" fill="currentColor"/>
    </svg>
  ),
  cashback: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 5.5v1.75M9 10.75V12.5M6.5 7.75a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "credit-card": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 8.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  savings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M14 7a5 5 0 1 0-10 0c0 2.5 1.5 4 2 5h6c.5-1 2-2.5 2-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 15h4M7.5 17h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const CATEGORY_COLORS: Record<Deal["category"], string> = {
  "bank-switching": "#2563eb",
  investing:        "#7c3aed",
  cashback:         "#16a34a",
  "credit-card":    "#ca8a04",
  savings:          "#0891b2",
};

export default function DealsPage() {
  const [active, setActive] = useState<Deal["category"] | "all">("all");

  const visible = DEALS.filter((d) => d.active && (active === "all" || d.category === active));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              <svg width="6" height="6" viewBox="0 0 8 8" fill="#16a34a"><circle cx="4" cy="4" r="3"/></svg>
              Updated regularly
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-4" style={{ color: "var(--foreground)" }}>
            Deals &amp;<br />Offers Hub
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            The best current UK financial deals, sign-up bonuses, and cashback offers — in one place. I only list things I&apos;d genuinely recommend.
          </p>
        </div>
      </section>

      {/* Disclaimer strip */}
      <div className="px-6 py-4 border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
            Some links are affiliate or referral links — clearly marked on each card. This is financial education, not financial advice.{" "}
            <Link href="/affiliate-disclosure" className="underline hover:opacity-70" style={{ color: "var(--ink-40)" }}>Affiliate disclosure</Link>
            {" "}·{" "}
            <Link href="/disclaimer" className="underline hover:opacity-70" style={{ color: "var(--ink-40)" }}>Disclaimer</Link>
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="pt-10 pb-4 px-6 sticky top-16 z-30 border-b" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat.value === "all"
                ? DEALS.filter((d) => d.active).length
                : DEALS.filter((d) => d.active && d.category === cat.value).length;
              if (count === 0 && cat.value !== "all") return null;
              return (
                <button key={cat.value}
                  onClick={() => setActive(cat.value)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                  style={{
                    background: active === cat.value ? "var(--foreground)" : "transparent",
                    color:      active === cat.value ? "var(--background)" : "var(--ink-60)",
                    borderColor: active === cat.value ? "var(--foreground)" : "var(--border)",
                  }}>
                  {cat.label}
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: active === cat.value ? "rgba(255,255,255,0.20)" : "var(--muted)", color: active === cat.value ? "var(--background)" : "var(--ink-40)" }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-10 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          {visible.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>No deals in this category yet</p>
              <p className="text-sm" style={{ color: "var(--ink-40)" }}>Check back soon — we update this page regularly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((deal) => {
                const catColor = CATEGORY_COLORS[deal.category];
                return (
                  <div key={deal.id} className="rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

                    {/* Card top */}
                    <div className="px-5 pt-5 pb-4 flex-1">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${catColor}18`, color: catColor }}>
                          {CATEGORY_ICONS[deal.category]}
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          {deal.badge && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-widest"
                              style={{ background: `${deal.badgeColor ?? catColor}18`, color: deal.badgeColor ?? catColor, border: `1px solid ${deal.badgeColor ?? catColor}40` }}>
                              {deal.badge}
                            </span>
                          )}
                          {deal.affiliate && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-widest"
                              style={{ background: "var(--muted)", color: "var(--ink-40)", border: "1px solid var(--border)" }}>
                              Affiliate
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: catColor }}>
                        {deal.provider}
                      </p>
                      <h3 className="font-display text-lg leading-snug mb-2" style={{ color: "var(--foreground)" }}>
                        {deal.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
                        {deal.summary}
                      </p>

                      {/* Value badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
                        style={{ background: `${catColor}12`, color: catColor, border: `1px solid ${catColor}30` }}>
                        {deal.value}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 pb-5 pt-3 border-t mt-auto" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center justify-between gap-3">
                        <a href={deal.href}
                          target={deal.href.startsWith("http") ? "_blank" : undefined}
                          rel={deal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                          style={{ background: "var(--foreground)", color: "var(--background)" }}>
                          {deal.cta}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            {deal.href.startsWith("http")
                              ? <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                              : <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>}
                          </svg>
                        </a>
                        {deal.expiry && (
                          <span className="text-xs" style={{ color: "var(--ink-40)" }}>
                            {deal.expiry === "Ongoing" ? "Ongoing" : `Expires ${deal.expiry}`}
                          </span>
                        )}
                      </div>
                      {deal.affiliateNote && (
                        <p className="text-xs mt-2" style={{ color: "var(--ink-40)" }}>{deal.affiliateNote}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Manage note */}
      <section className="py-10 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>Know a deal that&apos;s missing?</p>
            <p className="text-sm" style={{ color: "var(--ink-60)" }}>Get in touch and I&apos;ll look into adding it.</p>
          </div>
          <a href="mailto:enquiries@jamiesfinance.uk"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80 flex-shrink-0"
            style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
            enquiries@jamiesfinance.uk
          </a>
        </div>
      </section>
    </>
  );
}
