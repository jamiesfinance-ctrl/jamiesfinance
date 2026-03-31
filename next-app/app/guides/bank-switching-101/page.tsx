import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Bank Switching 101 — Jamie's Finance",
  description: "A comprehensive guide to earning free cash by switching bank accounts in 2025.",
};

const banks = [
  { name: "Monzo", note: "No switch required", reward: "£10", req: "Download Monzo, sign up using a friend link, and make a card payment within 30 days.", link: { href: "https://join.monzo.com/c/vhwscvhb", label: "My friend link →" } },
  { name: "NatWest", note: "Can't do RBS too (same group)", reward: "£175", req: "Open a Reward or Select account. Switch in a non-NatWest/RBS/Ulster account. Pay in £1,250+ and log in to mobile banking within 60 days." },
  { name: "First Direct", note: "Stack with cashback apps", reward: "£175", req: "Open account in-app. Switch in with 2+ direct debits in 45 days. Pay in £1,000+ and make 5+ debit card payments in 45 days." },
  { name: "Barclays", note: "Blue Rewards required", reward: "£175", req: "Open a sole account via the Barclays app. Switch in with 2+ direct debits. Join Blue Rewards (£5/month, pay in £800+). Deposit £1,500 within 30 days." },
  { name: "TSB", note: "+ £15/month bonus available", reward: "£100", req: "Open account online or in-app. Switch from another bank, make 5+ debit card purchases, log into the app. Also earn £15/month for 6 months with 20+ transactions." },
];

const faqs = [
  { q: "Will bank switching affect my credit score?", a: "A hard credit search is performed when you open most current accounts, which may cause a small, temporary dip in your credit score. However, as long as you're not doing this excessively, the impact is minimal and short-lived. Switching your main bank account can have more significant effects — which is why the dummy account strategy is recommended." },
  { q: "Can I do multiple switches at the same time?", a: "Yes, but you need a separate 'outgoing' account for each switch. That's why Chase is so valuable — you can create multiple dummy accounts to run several switch offers simultaneously. Just make sure each outgoing account has active direct debits before you initiate the switch." },
  { q: "How long does a bank switch take?", a: "The Current Account Switch Service (CASS) guarantees the switch completes within 7 working days. In practice, most switches complete within 3–5 working days. During this time, any payments to or from the old account are automatically redirected." },
  { q: "What happens to my direct debits when I switch?", a: "Under CASS, all direct debits and standing orders are automatically moved to the new account. Any payments that arrive at the old account are automatically redirected to the new one for 3 years. This is why it's safe to switch your dummy account — your real payments are unaffected." },
];

const toc = [
  { num: "01", label: "What is a bank switch offer?", href: "#what-is" },
  { num: "02", label: "Setting up direct debits", href: "#direct-debits" },
  { num: "03", label: "Current offers (Aug 2025)", href: "#offers" },
  { num: "04", label: "The dummy account strategy", href: "#dummy-account" },
  { num: "05", label: "Step-by-step walkthrough", href: "#walkthrough" },
  { num: "06", label: "Maximising your rewards", href: "#maximise" },
  { num: "07", label: "FAQs", href: "#faq" },
  { num: "08", label: "Get in touch", href: "#contact" },
];

export default function BankSwitchingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Free Guide", "Updated August 2025", "By @jamiesfinance"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-6xl sm:text-7xl md:text-[6rem] leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Bank<br />Switching<br />101
          </h1>
          <p className="text-xl max-w-2xl prose-body mb-10">
            A comprehensive guide to earning free cash by switching bank accounts in 2025. Learn exactly how to do it safely, legally, and repeatedly.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: "⭐", bold: "Up to £175", sub: "per switch" },
              { icon: "🔒", bold: "100% Free", sub: "no cost to you" },
              { icon: "⏱", bold: "~20 minutes", sub: "to set up" },
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
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Disclaimer & Affiliate Disclosure.</strong>{" "}
              This guide is for informational and educational purposes only. I am not a financial advisor. Offers and terms can change at any time — always check the bank&apos;s website directly. Some links may be referral links; I may receive a small reward at no cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* TOC */}
      <section className="py-14 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading mb-8">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Contents</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {toc.map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:border-foreground"
                style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
                <span className="flex items-center gap-3">
                  <span className="font-display text-2xl" style={{ color: "var(--border)" }}>{item.num}</span>
                  {item.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section id="what-is" className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>01</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>What is a bank switch offer?</h2>
          </div>
          <div className="space-y-5 prose-body">
            <p>Banks compete aggressively for current account customers. To attract new customers, many offer <strong>cash incentives</strong> — typically between £100 and £175 — to anyone who switches their current account to them using the official Current Account Switch Service (CASS).</p>
            <p>The CASS is a <strong>free, government-backed service</strong> that makes switching bank accounts easy and risk-free. It automatically moves all your direct debits, standing orders, and payment history to your new account within 7 working days.</p>
            <p>The best part? <strong>There is nothing stopping you from doing this repeatedly.</strong> As long as you have a different &quot;outgoing&quot; account for each offer, you can stack multiple switches and earn hundreds of pounds per year.</p>
          </div>
          <div className="callout mt-8">
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>The key insight</p>
            <p className="text-sm prose-body">Banks only check whether you&apos;re a <em>new</em> customer — not whether you&apos;ve done this before with other banks. Each offer is independent.</p>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section id="direct-debits" className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>02</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Setting up direct debits</h2>
          </div>
          <div className="space-y-5 prose-body">
            <p>Most bank switch offers require you to have <strong>active direct debits</strong> on the account you&apos;re switching from. A direct debit needs to be active — not just set up — to count.</p>
            <p>Here are <strong>three easy ones to set up</strong>:</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { title: "Moneybox", cost: "Effectively free", desc: "A savings app — top up your savings pot for as little as £2/week. The money goes into your own savings." },
              { title: "30p Newsletter", cost: "From 30p/month", desc: "Pay as little as 30p via direct debit for a newsletter at 30pence.co.uk. You can do 60p or 80p for multiple DDs." },
              { title: "PayPal", cost: "One-off payment", desc: "Top up your PayPal balance with as little as £10. Once the first payment is taken, the direct debit is active." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl p-6 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--muted)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <h3 className="font-display text-lg mb-2" style={{ color: "var(--foreground)" }}>{card.title}</h3>
                <p className="text-sm prose-body">{card.desc}</p>
                <span className="mt-3 inline-block text-xs font-semibold" style={{ color: "var(--ink-40)" }}>{card.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03 — Offers Table */}
      <section id="offers" className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>03</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Current offers</h2>
          </div>
          <p className="prose-body mb-8">As of <strong>1st August 2025</strong>. Always check the bank&apos;s website directly before initiating a switch.</p>

          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            {/* Header row */}
            <div className="grid grid-cols-[1.5fr_1fr_2fr] gap-4 px-5 py-3 text-[0.6875rem] font-bold uppercase tracking-widest border-b" style={{ borderColor: "var(--border)", color: "var(--ink-40)", background: "var(--muted)" }}>
              <span>Bank</span><span>Reward</span><span>Key Requirements</span>
            </div>
            {banks.map((bank, i) => (
              <div key={i} className="grid grid-cols-[1.5fr_1fr_2fr] gap-4 items-start px-5 py-4 border-b last:border-b-0 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{bank.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ink-40)" }}>{bank.note}</p>
                </div>
                <div>
                  <span className="font-display text-xl px-2 py-0.5 rounded-lg" style={{ background: "var(--muted)", color: "var(--foreground)" }}>{bank.reward}</span>
                </div>
                <p className="text-sm prose-body">
                  {bank.req}
                  {bank.link && <> <Link href={bank.link.href} target="_blank" rel="noopener" className="underline underline-offset-2">{bank.link.label}</Link></>}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 prose-body">Ts&amp;Cs apply. Conditions can change at any time.</p>
        </div>
      </section>

      {/* Section 04 — Dummy Account */}
      <section id="dummy-account" className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>04</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>The dummy account strategy</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 prose-body">
              <p><strong>You should never switch your main bank account</strong> — this carries much worse credit score implications. Instead, create a dummy account that exists solely for the purpose of switching.</p>
              <p><strong>Chase Bank</strong> is the best option. You can create additional accounts in seconds — each gets a unique sort code and account number.</p>
              <div className="callout">
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Important Chase note</p>
                <p className="text-sm prose-body">Always keep at least <strong>2 accounts open within Chase</strong>. Switching away your only Chase account closes your entire Chase profile. Switching additional Chase accounts does <em>not</em> cancel your debit card.</p>
              </div>
              <p>Simply tap <strong>&apos;Add +&apos;</strong> in the Chase app to create a new account with a fresh sort code and account number instantly.</p>
            </div>
            <div className="rounded-2xl p-6 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--ink-40)" }}>Step-by-step in Chase</p>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Open Chase app", desc: "Make sure you already have an existing Chase account open." },
                  { step: "2", title: "Tap 'Add +'", desc: "Creates a brand new current account with a unique sort code and account number in seconds." },
                  { step: "3", title: "Set up direct debits", desc: "Use the new sort code/account to set up your direct debits (Moneybox, 30p newsletter, or PayPal)." },
                  { step: "4", title: "Initiate the switch", desc: "Once direct debits are active, initiate the switch using this account as the \"outgoing\" account." },
                  { step: "5", title: "Collect your reward", desc: "Once the switch completes and you meet all requirements, your cash reward is paid automatically." },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: "var(--muted)", color: "var(--ink-60)" }}>{s.step}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                      <p className="text-sm prose-body mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05 — Walkthrough */}
      <section id="walkthrough" className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>05</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Step-by-step walkthrough</h2>
          </div>
          <div className="space-y-6 prose-body">
            <p>Here&apos;s the exact process for a complete bank switch from start to finish:</p>
            {[
              { title: "Check eligibility", desc: "Read the bank's T&Cs to confirm you're eligible (usually: new customer only, haven't held that account before, must use CASS)." },
              { title: "Create your dummy account", desc: "Open Chase (if you haven't already) and create a new sub-account using 'Add +'. Note the sort code and account number." },
              { title: "Set up active direct debits", desc: "Set up at least 2 active direct debits from the dummy account. Wait until the first payment has been taken before proceeding." },
              { title: "Apply for the new account", desc: "Apply for the new bank account online or in the app. During the application, select the option to switch using CASS." },
              { title: "Enter the dummy account details", desc: "When asked for the account you want to switch from, enter your Chase dummy account's sort code and account number." },
              { title: "Meet all requirements", desc: "Within the deadline, complete any remaining requirements: minimum deposit, debit card payments, mobile app login, etc." },
              { title: "Receive your reward", desc: "Once all conditions are met, the cash reward is paid automatically — usually within 30 days of completing the requirements." },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: "var(--muted)", color: "var(--ink-60)" }}>{i + 1}</span>
                <div>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                  <p className="mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 06 — Maximise */}
      <section id="maximise" className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>06</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Maximising your rewards</h2>
          </div>
          <div className="space-y-5 prose-body">
            <p>Here&apos;s how to get more out of bank switching:</p>
            <ul className="space-y-3 list-none">
              {[
                "Stack cashback: Use Quidco or TopCashback when opening new accounts to earn additional cashback on top of the bank's offer.",
                "Run offers in parallel: With multiple Chase dummy accounts, you can run several switches simultaneously.",
                "Wait for requalification: Some banks allow you to switch back after a waiting period (often 12–24 months). Track when you become eligible again.",
                "Refer friends: Some offers (like Monzo) give extra rewards for successful referrals. Share your link once you've joined.",
                "Watch for seasonal boosts: Banks often increase their switch offers around January and September. Check comparison sites regularly.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ background: "var(--foreground)" }} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              { title: "Quidco", href: "https://www.quidco.com", desc: "UK's largest cashback site. Many bank switch offers are listed here with additional cashback on top of the bank's bonus." },
              { title: "TopCashback", href: "https://www.topcashback.co.uk", desc: "Alternative to Quidco. Always compare both to see which offers higher cashback for the bank you're switching to." },
            ].map((r) => (
              <Link key={r.title} href={r.href} target="_blank" rel="noopener"
                className="rounded-2xl p-5 border flex flex-col gap-2 transition-all hover:border-foreground"
                style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg" style={{ color: "var(--foreground)" }}>{r.title}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="text-sm prose-body">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 07 — FAQ */}
      <section id="faq" className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="section-heading">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: "var(--ink-40)" }}>07</span>
            <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>FAQs</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} style={{ borderColor: "var(--border)" }}>
                <AccordionTrigger className="font-display text-lg py-5 text-left" style={{ color: "var(--foreground)" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="prose-body pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section 08 — Contact */}
      <section id="contact" className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl mb-4" style={{ color: "var(--foreground)" }}>Questions? Get in touch</h2>
          <p className="prose-body mb-10 max-w-xl mx-auto">If you have any questions about bank switching or this guide, reach out on TikTok, WhatsApp, or email.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://www.tiktok.com/@jamiesfinance" target="_blank" rel="noopener"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--foreground)", color: "var(--background)" }}>
              TikTok @jamiesfinance
            </Link>
            <Link href="https://wa.me/447404284953" target="_blank" rel="noopener"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all hover:border-foreground"
              style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
              WhatsApp
            </Link>
            <Link href="mailto:jamiesfinance@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all hover:border-foreground"
              style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
              jamiesfinance@gmail.com
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
