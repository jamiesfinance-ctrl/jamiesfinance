import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Start Investing With Just £25 a Month — Jamie's Finance",
  description:
    "You don't need a lot of money to start investing. This guide covers index funds, Stocks & Shares ISAs, and why time in the market beats everything else.",
};

export default function InvestingGuide() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Investing", "8 min read", "By @jamiesfinance"].map((t) => (
              <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-[4.5rem] leading-none mb-6" style={{ color: "var(--foreground)" }}>
            How to Start<br />Investing With<br />Just £25 a Month
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            Most people think investing is for people who already have money. It isn't. Here's why £25 a month — and the decision to start — is genuinely all you need.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 py-5" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-4 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Not financial advice.</strong>{" "}
              This guide is for educational purposes only. Investing involves risk — the value of your investments can go down as well as up. Do your own research before making any financial decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Section 1 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              The amount isn&apos;t the point. Starting is.
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                The most common reason people don&apos;t invest is that they think they don&apos;t have enough money to make it worthwhile. This is the wrong way to think about it entirely.
              </p>
              <p>
                Investing £25 a month probably won&apos;t make you a millionaire. But that&apos;s not why you do it at the start. You do it to <strong>learn how it works</strong> — to understand what an index fund is, to see your money actually grow (even slowly), and to break through the mental barrier that investing is somehow complicated or reserved for people wealthier than you.
              </p>
              <p>
                It isn&apos;t. And once you understand that, you&apos;ll wish you&apos;d started sooner.
              </p>
            </div>

            <div className="callout mt-6">
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>The key insight</p>
              <p className="text-sm prose-body">
                The biggest variable in long-term investing isn&apos;t how much you invest — it&apos;s <em>how long</em> you invest for. Time in the market almost always beats trying to time the market.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              First: use a Stocks &amp; Shares ISA
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Before you invest a single pound, you need to understand the wrapper you put your investments in. In the UK, the best vehicle for most people is a <strong>Stocks &amp; Shares ISA</strong> (S&amp;S ISA).
              </p>
              <p>
                An ISA is not an investment itself — it&apos;s a tax-free container that holds your investments. Any growth inside an ISA is <strong>completely free from capital gains tax and income tax</strong>. If your investments double in value inside an ISA, you pay nothing extra to the government when you withdraw.
              </p>
              <p>
                You can put up to <strong>£20,000 per tax year</strong> into ISAs. For most people starting with £25/month, you&apos;re a long way from that limit — so there&apos;s no reason not to use one.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border mt-6" style={{ borderColor: "var(--border)" }}>
              <div className="px-5 py-3 border-b text-[0.6875rem] font-bold uppercase tracking-widest"
                style={{ borderColor: "var(--border)", color: "var(--ink-40)", background: "var(--muted)" }}>
                S&amp;S ISA vs Cash ISA — key differences
              </div>
              {[
                { label: "S&S ISA", value: "Holds investments (funds, shares). Higher potential returns over the long term. Some risk." },
                { label: "Cash ISA", value: "Holds cash. Like a savings account but tax-free. Lower returns — often below inflation." },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[120px_1fr] gap-4 px-5 py-4 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{row.label}</p>
                  <p className="text-sm prose-body">{row.value}</p>
                </div>
              ))}
            </div>

            <p className="prose-body mt-4 text-sm">
              For long-term wealth building, an S&amp;S ISA is the right choice. Cash ISAs tend to lose value in real terms once inflation is accounted for.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              What is an index fund?
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                Here&apos;s where it gets simple. An <strong>index fund</strong> is a type of investment fund that tracks a market index — like the S&amp;P 500 (the 500 largest US companies) or the FTSE 100 (the 100 largest UK companies).
              </p>
              <p>
                Instead of trying to pick individual winning stocks, you buy a tiny slice of all of them at once. When Apple goes up, you benefit. When one company has a bad day, the others cushion the fall. You&apos;re not betting on any one company — you&apos;re betting on the entire economy doing well over time, which historically it has.
              </p>
              <p>
                Index funds also have much lower fees than actively managed funds, where a fund manager tries to beat the market (and usually doesn&apos;t). Research consistently shows that most actively managed funds underperform a simple index fund over the long term, especially after fees.
              </p>
            </div>

            <div className="callout mt-6">
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Good starting point</p>
              <p className="text-sm prose-body">
                A global index fund — one that tracks companies across the whole world, not just one country — is a sensible, diversified choice for a beginner. Look for low annual fees (called the &ldquo;ongoing charges figure&rdquo; or OCF), ideally under 0.20%.
              </p>
            </div>
          </div>

          {/* Section 4 — Time in the market */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Time in the market beats timing the market
            </h2>
            <div className="space-y-4 prose-body">
              <p>
                This is the most important concept in long-term investing, and it&apos;s worth repeating: <strong>the length of time your money is invested matters far more than when you invest or how much you start with.</strong>
              </p>
              <p>
                This is because of <strong>compound growth</strong>. When your investments grow, you earn returns on those returns — and over decades, that compounds into something significant. £25/month invested for 30 years, assuming a modest 7% average annual return, grows to around <strong>£28,000</strong>. You&apos;ve put in £9,000. The rest is growth working on growth.
              </p>
              <p>
                The catch? You have to leave it alone and not panic when markets dip. Markets go up and down constantly — that&apos;s normal. What matters is the long-run direction, which for diversified global funds has always been upward over long periods.
              </p>
            </div>

            {/* Compound table */}
            <div className="rounded-2xl overflow-hidden border mt-8" style={{ borderColor: "var(--border)" }}>
              <div className="px-5 py-3 border-b text-[0.6875rem] font-bold uppercase tracking-widest"
                style={{ borderColor: "var(--border)", color: "var(--ink-40)", background: "var(--muted)" }}>
                £25/month invested — estimated growth at 7% avg annual return
              </div>
              {[
                { years: "10 years", invested: "£3,000", value: "~£4,300" },
                { years: "20 years", invested: "£6,000", value: "~£12,400" },
                { years: "30 years", invested: "£9,000", value: "~£28,000" },
                { years: "40 years", invested: "£12,000", value: "~£65,000" },
              ].map((row) => (
                <div key={row.years} className="grid grid-cols-3 gap-4 px-5 py-4 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{row.years}</p>
                  <p className="text-sm prose-body">Invested: {row.invested}</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Est. value: {row.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 prose-body">Illustrative only. Past performance is not a guarantee of future returns. Does not account for inflation or fees.</p>
          </div>

          {/* Section 5 — How to start */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              How to actually get started
            </h2>
            <p className="prose-body mb-6">This is genuinely simpler than most people expect. Here&apos;s the process:</p>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Choose a platform",
                  desc: "Open a Stocks & Shares ISA with a low-cost provider. Popular UK options include Vanguard Investor, Trading 212, Freetrade, and Moneybox. Compare their fees before choosing.",
                },
                {
                  step: "2",
                  title: "Pick a simple global index fund",
                  desc: "Look for a fund that tracks the global stock market — something like a \"Global All-Cap\" or \"World Index\" fund. Check the ongoing charges figure (OCF) is low.",
                },
                {
                  step: "3",
                  title: "Set up a monthly direct debit",
                  desc: "Automate it. Set up a £25/month payment into your ISA so you invest consistently without having to think about it. This is called pound-cost averaging.",
                },
                {
                  step: "4",
                  title: "Leave it alone",
                  desc: "This is the hardest part. Don't obsessively check it. Don't panic when it dips. Investing is a long game — your job is to stay invested.",
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 rounded-2xl p-5 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: "var(--foreground)", color: "var(--background)" }}>
                    {s.step}
                  </span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{s.title}</p>
                    <p className="text-sm prose-body">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 — Common myths */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl mb-5" style={{ color: "var(--foreground)" }}>
              Common myths — debunked
            </h2>
            <div className="space-y-4">
              {[
                {
                  myth: "\"I'll start when I have more money.\"",
                  truth: "Time is the one thing you can't get back. £25/month started today beats £100/month started in five years.",
                },
                {
                  myth: "\"I need to watch the markets every day.\"",
                  truth: "You don't. Set up your monthly investment, check in quarterly at most. Active management rarely beats a passive index strategy.",
                },
                {
                  myth: "\"Investing is too risky.\"",
                  truth: "Keeping all your money in a savings account is also a risk — inflation erodes its real value over time. Diversified index funds spread risk across hundreds of companies.",
                },
                {
                  myth: "\"It's complicated and I'll get it wrong.\"",
                  truth: "Buying a single global index fund inside an ISA is three clicks. That's it. There is no simpler form of long-term investing.",
                },
              ].map((item) => (
                <div key={item.myth} className="rounded-2xl p-5 border"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-sm font-semibold italic mb-2" style={{ color: "var(--ink-40)" }}>{item.myth}</p>
                  <p className="text-sm prose-body">{item.truth}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div className="rounded-2xl p-8 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-display text-3xl mb-4" style={{ color: "var(--foreground)" }}>
              Start today. Start with £25.
            </h2>
            <p className="prose-body max-w-xl mx-auto mb-6">
              The most expensive decision you can make in investing is to wait. Every month you delay is a month of compound growth you can&apos;t get back. The amount genuinely doesn&apos;t matter — what matters is that you start.
            </p>
            <Link href="/tools/compound-interest"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--foreground)", color: "var(--background)" }}>
              Try the compound interest calculator
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="py-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.6875rem] font-bold uppercase tracking-widest mb-6" style={{ color: "var(--ink-40)" }}>
            Related
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/tools/compound-interest"
              className="rounded-2xl p-5 border transition-all hover:border-foreground"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}>
              <p className="font-display text-lg mb-1" style={{ color: "var(--foreground)" }}>Compound Interest Calculator</p>
              <p className="text-sm prose-body">See exactly how your money grows over time with our free tool.</p>
            </Link>
            <Link href="/bank-switching-offers"
              className="rounded-2xl p-5 border transition-all hover:border-foreground"
              style={{ background: "var(--background)", borderColor: "var(--border)" }}>
              <p className="font-display text-lg mb-1" style={{ color: "var(--foreground)" }}>Bank Switch Offers</p>
              <p className="text-sm prose-body">Earn up to £500 in cash by switching your current account.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
