import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links & Freebies — Jamie's Finance",
  description: "All of Jamie's links, freebies, and recommended resources in one place.",
};

const sections = [
  {
    title: "Free Tools & Guides",
    items: [
      { label: "Compound Interest Calculator", desc: "See how your money grows over time", href: "/tools/compound-interest", external: false },
      { label: "Bank Switching 101", desc: "The complete guide to earning cash from bank switches", href: "/guides/bank-switching-101", external: false },
      { label: "Start Investing with £25/Month", desc: "A beginner's guide to index funds and S&S ISAs", href: "/guides/start-investing-25-a-month", external: false },
      { label: "My Bank Switching Story — How I Made £3,000", desc: "My personal experience earning tax-free cash from switching", href: "/guides/my-bank-switching-story", external: false },
    ],
  },
  {
    title: "Bank Switching Offers",
    items: [
      { label: "All current bank switch bonuses", desc: "Updated list of the best switching deals in the UK right now", href: "/bank-switching-offers", external: false },
    ],
  },
  {
    title: "Credit Cards",
    items: [
      { label: "British Airways American Express", desc: "Earn Avios on everything — my referral link", href: "https://americanexpress.com/en-gb/referral/ba-classic-credit?ref=jAMESShSvU&XL=MIMNS", external: true },
      { label: "Nectar American Express", desc: "Earn Nectar points on everyday spending — my referral link", href: "https://americanexpress.com/en-gb/referral/nectar-credit?ref=jAMESSjN3G&XLINK=MYCP", external: true },
      { label: "All recommended credit cards", desc: "Every card I personally use in one place", href: "/credit-cards", external: false },
    ],
  },
  {
    title: "Cashback & Rewards",
    items: [
      { label: "TopCashback — join with welcome bonus", desc: "Earn £10–£20 welcome bonus on your first cashback purchase", href: "https://www.topcashback.co.uk/ref/jamieschmidt1/", external: true },
    ],
  },
  {
    title: "Digital Products",
    items: [
      { label: "Bank Switching 101 Playbook", desc: "The step-by-step guide to maximising bank switch bonuses", href: "/products", external: false },
    ],
  },
  {
    title: "Find Me Online",
    items: [
      { label: "TikTok — @jamiesfinance", desc: "Short-form financial education", href: "https://www.tiktok.com/@jamiesfinance", external: true },
      { label: "YouTube — @jamiesfinance", desc: "In-depth guides and explainers", href: "https://www.youtube.com/@jamiesfinance", external: true },
      { label: "Instagram — @jamiesfinance_", desc: "Tips, infographics, and updates", href: "https://www.instagram.com/jamiesfinance_", external: true },
      { label: "Email Jamie", desc: "jamie@jamiesfinance.uk", href: "mailto:jamie@jamiesfinance.uk", external: false },
    ],
  },
];

export default function LinksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border mb-6"
            style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
            @jamiesfinance
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-none mb-4" style={{ color: "var(--foreground)" }}>
            Links & Freebies
          </h1>
          <p className="text-lg prose-body">
            Everything in one place — free guides, tools, recommended products, and ways to earn extra cash.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-2xl mx-auto space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--ink-40)" }}>
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>{item.label}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "var(--ink-40)" }}>{item.desc}</p>
                    </div>
                    <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      {item.external ? (
                        <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 pb-16" style={{ background: "var(--background)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
              Some links on this page are referral or affiliate links. If you sign up through them, I may earn a small reward — at no cost to you. I only recommend products and services I personally use or would genuinely recommend. Nothing on this page is financial advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
