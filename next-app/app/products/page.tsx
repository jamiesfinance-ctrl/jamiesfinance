import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Products — Jamie's Finance",
  description: "Guides, playbooks, and resources to help you make smarter financial decisions in the UK.",
};

const products = [
  {
    tag: "Guide",
    title: "Bank Switching 101",
    desc: "The complete playbook for earning cash from bank account switching in the UK. Covers the dummy account strategy, direct debit setup, step-by-step walkthroughs, and how to run multiple switches at once.",
    href: "/guides/bank-switching-101",
    available: true,
    highlights: ["Dummy account strategy", "Step-by-step walkthrough", "Maximising rewards"],
  },
  {
    tag: "Coming Soon",
    title: "ISA & Investing Starter Guide",
    desc: "Everything you need to know to open a Stocks & Shares ISA and start investing in index funds with as little as £25/month.",
    href: "#",
    available: false,
    highlights: ["S&S ISA explained", "Index fund selection", "Long-term strategies"],
  },
  {
    tag: "Coming Soon",
    title: "Budget Blueprint",
    desc: "A practical, UK-focused budgeting system that actually works. Covers the 50/30/20 rule, expense tracking, and building an emergency fund.",
    href: "#",
    available: false,
    highlights: ["50/30/20 framework", "UK cost of living focus", "Emergency fund calculator"],
  },
  {
    tag: "Coming Soon",
    title: "Side Income Playbook",
    desc: "Legitimate ways to earn extra income in the UK — from cashback stacking and referral schemes to freelancing and selling online.",
    href: "#",
    available: false,
    highlights: ["Cashback & referrals", "Freelance income", "Selling platforms"],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              Digital Products
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Guides &amp;<br />Resources
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            In-depth guides and playbooks to help you earn more, spend less, and build financial knowledge — built specifically for people in the UK.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {products.map((p) => (
              <div key={p.title}
                className="rounded-2xl p-8 border flex flex-col sm:flex-row sm:items-start gap-8"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                      style={{
                        background: p.available ? "var(--foreground)" : "transparent",
                        color: p.available ? "var(--background)" : "var(--ink-40)",
                        borderColor: p.available ? "var(--foreground)" : "var(--border)",
                      }}>
                      {p.tag}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl mb-3" style={{ color: "var(--foreground)" }}>{p.title}</h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--ink-60)" }}>{p.desc}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="text-xs font-medium px-2.5 py-1 rounded-full border"
                        style={{ background: "var(--muted)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 sm:self-center">
                  {p.available ? (
                    <Link href={p.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ background: "var(--foreground)", color: "var(--background)" }}>
                      Read now
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold border cursor-not-allowed"
                      style={{ borderColor: "var(--border)", color: "var(--ink-40)" }}>
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4" style={{ color: "var(--foreground)" }}>Want to be notified?</h2>
          <p className="mb-8" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            New guides drop regularly. Join the newsletter to get notified when new products are available.
          </p>
          <Link href="/#signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: "var(--foreground)", color: "var(--background)" }}>
            Join the newsletter
          </Link>
        </div>
      </section>
    </>
  );
}
