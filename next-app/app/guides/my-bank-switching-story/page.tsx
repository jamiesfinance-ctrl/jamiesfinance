import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How I Made £3,000 in a Year from Bank Switching — Jamie's Finance",
  description: "A personal account of how I earned over £3,000 in one year just by switching bank accounts — no direct debits needed for some of the best offers.",
};

export default function BankSwitchingStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Personal Story", "Banking", "By @jamiesfinance"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            How I Made<br />£3,000 in a<br />Year from Bank<br />Switching
          </h1>
          <p className="text-xl max-w-2xl prose-body mb-10">
            Tax-free cash, zero skill required, and you can do it entirely on your phone. Here&apos;s exactly what I did — and how you can replicate it.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: "💰", bold: "£3,000+", sub: "earned in 12 months" },
              { icon: "📋", bold: "Zero skill", sub: "just admin" },
              { icon: "✅", bold: "Tax-free", sub: "HMRC approved" },
            ].map((s) => (
              <div key={s.bold} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: "var(--foreground)", color: "var(--background)" }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{s.bold}</p>
                  <p className="text-xs" style={{ color: "var(--ink-40)" }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 py-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Affiliate Disclosure.</strong>{" "}
              Some links in this post are referral links — I may earn a small reward at no cost to you if you sign up through them. I only share links to services I personally use or recommend. This is not financial advice.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto space-y-14">

          {/* Section 1 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Let me be straight with you
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Bank switching is probably the least glamorous thing I&apos;ve ever written about. There&apos;s no investing strategy, no budgeting framework, no mindset shift required. It&apos;s just admin. Boring, repetitive, entirely risk-free admin — that happens to pay you hundreds of pounds at a time.
              </p>
              <p>
                Over the course of roughly 12 months, I earned just over <strong style={{ color: "var(--foreground)" }}>£3,000</strong> from a combination of bank switching bonuses and student-specific offers. That money went straight into my savings — completely tax-free, no strings attached.
              </p>
              <p>
                I want to be honest: a chunk of that came from student perks that aren&apos;t available to everyone. But a significant portion — well over £1,000 — came purely from bank switching offers that <em>any</em> UK adult can access right now. So whether you&apos;re a student or not, there&apos;s real money here for you.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              How bank switching works
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Banks pay you cash to switch your current account to them. It sounds too good to be true, but it&apos;s completely legitimate — it&apos;s how banks acquire new customers. They&apos;d rather give you £150 once than spend the same on advertising with no guaranteed result.
              </p>
              <p>
                The switch is handled through the <strong style={{ color: "var(--foreground)" }}>Current Account Switch Service (CASS)</strong> — a government-backed scheme that moves your direct debits, standing orders, and account history in 7 working days. Your old account is automatically closed, and any payments sent to it are redirected to your new account for 3 years.
              </p>
              <p>
                Most offers require you to pay in a minimum amount (usually £1,000–£1,500 per month) and set up a couple of direct debits. Some don&apos;t require direct debits at all — and those are my favourite ones, especially if you&apos;re newer to this and don&apos;t want to deal with the complexity.
              </p>
            </div>
          </div>

          {/* Callout: no DD tip */}
          <div className="rounded-2xl p-6 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--ink-40)" }}>
              Pro Tip — No Direct Debits Needed
            </p>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--foreground)" }}>NatWest Group</strong> (which includes NatWest and RBS) offers some of the best switch bonuses without requiring any active direct debits. If you&apos;re just getting started and don&apos;t want to juggle direct debit setups, start here. You just need to pay in the minimum monthly amount and use your debit card a few times — that&apos;s it.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              The dummy account strategy
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Here&apos;s the part that most people miss: you don&apos;t have to switch your real bank account. In fact, I&apos;d strongly recommend you don&apos;t. Instead, you set up a <strong style={{ color: "var(--foreground)" }}>dummy account</strong> specifically to switch away from.
              </p>
              <p>
                The way it works: you open a free account (Chase is the go-to for this), set up a couple of small direct debits from it, and then switch <em>that</em> account to whichever bank is offering the bonus. Your real finances are completely untouched. Once the switch is complete and the bonus lands, you just repeat the process.
              </p>
              <p>
                This is how you can do multiple switches without disrupting your actual banking setup. I had three dummy accounts running at different points, which meant I could stack multiple offers simultaneously.
              </p>
              <p>
                For a full walkthrough of the dummy account method, including exactly which direct debits to use and how to set everything up, check out the full{" "}
                <Link href="/guides/bank-switching-101" className="font-semibold" style={{ color: "var(--foreground)" }}>
                  Bank Switching 101 guide
                </Link>.
              </p>
            </div>
          </div>

          {/* Section 4: TopCashback */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Stack it with TopCashback
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                One thing that genuinely surprised me: some bank switching offers are available through <strong style={{ color: "var(--foreground)" }}>TopCashback</strong>, which means you can earn additional cashback on top of the bank&apos;s own switching bonus. First Direct is a great example of this — they offer a switch bonus, and you can also trigger a TopCashback payout by going through the TopCashback portal.
              </p>
              <p>
                If you haven&apos;t used TopCashback before, it also gives you a <strong style={{ color: "var(--foreground)" }}>welcome bonus of £10–£20</strong> on your first cashback purchase, depending on the current promotion. That&apos;s free money just for signing up and making a purchase you would have made anyway.
              </p>
            </div>

            {/* TopCashback CTA box */}
            <div className="mt-6 rounded-2xl p-6 border" style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: "var(--foreground)", color: "var(--background)" }}>
                  💳
                </div>
                <div className="flex-1">
                  <p className="font-bold mb-1" style={{ color: "var(--foreground)" }}>Sign up to TopCashback</p>
                  <p className="text-sm mb-4" style={{ color: "var(--ink-60)", lineHeight: 1.6 }}>
                    Use my referral link to sign up and earn a welcome bonus of £10–£20 on your first cashback purchase — plus stack it with bank switching offers like First Direct.
                  </p>
                  <a
                    href="https://www.topcashback.co.uk/ref/jamieschmidt1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "var(--foreground)", color: "var(--background)" }}
                  >
                    Join TopCashback (+ welcome bonus)
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Is this all worth it?
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Yes. Bluntly — yes. The time investment is low, the returns are high relative to any other low-effort activity I&apos;m aware of, and every penny is tax-free.
              </p>
              <p>
                HMRC treats bank switching bonuses as a <strong style={{ color: "var(--foreground)" }}>discount or incentive</strong>, not income. So unlike interest earned in a savings account (which counts towards your Personal Savings Allowance), switching bonuses don&apos;t need to be declared. You just receive the money and it&apos;s yours.
              </p>
              <p>
                The only thing it costs you is time — and not much of it. Each switch takes maybe 20–30 minutes to set up. After that, you wait for the bonus to land, then move on to the next one. I&apos;d estimate I spent maybe 5–6 hours total over the course of the year on all the switches I completed, for over £3,000 in return. No salary comes close to that hourly rate.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Where to start
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                If you want to see exactly which offers are live right now, how much each one pays, and what you need to qualify, I maintain a regularly updated page with all the current deals:
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/bank-switching-offers"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                View all current offers
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link
                href="/guides/bank-switching-101"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}
              >
                Read the full guide
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6" style={{ background: "#141414" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl sm:text-4xl text-white mb-4">Want more tips like this?</p>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.60)", lineHeight: 1.7 }}>
            I share the best bank offers, money-saving tips, and financial education every week — no spam, ever.
          </p>
          <Link href="/#signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: "white", color: "#141414" }}>
            Join the newsletter
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
