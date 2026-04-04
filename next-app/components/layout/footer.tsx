import Link from "next/link";

const NAV_SECTIONS = [
  {
    heading: "Tools",
    links: [
      { label: "Take-Home Pay Calculator", href: "/tools/take-home-pay" },
      { label: "Student Loan Simulator",   href: "/tools/student-loan" },
      { label: "Budget Builder",           href: "/tools/budget-builder" },
      { label: "Compound Interest",        href: "/tools/compound-interest" },
      { label: "Mortgage Calculator",      href: "/tools/mortgage-calculator" },
      { label: "All Tools",                href: "/tools" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { label: "Bank Switching 101",          href: "/guides/bank-switching-101" },
      { label: "How I Made £3,000 Switching", href: "/guides/my-bank-switching-story" },
      { label: "Start Investing with £25/mo", href: "/guides/start-investing-25-a-month" },
    ],
  },
  {
    heading: "Deals & Reviews",
    links: [
      { label: "Deals & Offers Hub",    href: "/deals" },
      { label: "Bank Switching Offers", href: "/bank-switching-offers" },
      { label: "Credit Card Reviews",   href: "/credit-cards" },
      { label: "Product Reviews",       href: "/reviews" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "All Links & Freebies",  href: "/links" },
      { label: "Digital Products",      href: "/products" },
      { label: "My Philosophy",         href: "/philosophy" },
      { label: "Disclaimer",            href: "/disclaimer" },
      { label: "Affiliate Disclosure",  href: "/affiliate-disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t" style={{ background: "var(--card)", borderColor: "var(--border)" }}>

      {/* Sitemap */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--ink-40)" }}>
                {section.heading}
              </p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ color: "var(--ink-60)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 py-5" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-display text-base leading-none" style={{ color: "var(--foreground)" }}>
              Jamie&apos;s Finance
            </span>
            <p className="text-xs" style={{ color: "var(--ink-40)" }}>
              © {new Date().getFullYear()} — Educational use only. Not financial advice.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/disclaimer"
              className="text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--ink-40)" }}>
              Disclaimer
            </Link>
            <Link href="/affiliate-disclosure"
              className="text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--ink-40)" }}>
              Affiliate Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
