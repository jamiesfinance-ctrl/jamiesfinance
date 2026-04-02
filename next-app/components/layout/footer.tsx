import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <span
              className="font-display text-lg leading-none"
              style={{ color: "var(--foreground)" }}
            >
              Jamie&apos;s Finance
            </span>
            <div className="flex flex-wrap items-center gap-5">
              {[
                { label: "Guides", href: "/#guides" },
                { label: "Tools", href: "/tools" },
                { label: "Reviews", href: "/reviews" },
                { label: "About", href: "/#about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: "var(--ink-40)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t"
          style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--ink-40)" }}>
            © {new Date().getFullYear()} Jamie&apos;s Finance — Educational use only. Not financial advice.
          </p>
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
