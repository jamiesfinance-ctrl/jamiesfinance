import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <span
            className="font-display text-lg leading-none"
            style={{ color: "var(--foreground)" }}
          >
            Jamie&apos;s Finance
          </span>
          <div className="flex items-center gap-5">
            {[
              { label: "Guides", href: "/#guides" },
              { label: "Tools", href: "/tools" },
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

        <p className="text-xs text-center" style={{ color: "var(--ink-40)" }}>
          © {new Date().getFullYear()} Jamie&apos;s Finance — Educational use only. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
