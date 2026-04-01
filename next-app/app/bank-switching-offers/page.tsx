import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Bank Switch Offers — Jamie's Finance",
  description:
    "The latest UK bank switching bonuses updated regularly. Earn up to £500 by switching your current account.",
};

const standardOffers = [
  {
    bank: "Santander",
    bonus: "£180",
    extra: "+ 1% bills cashback",
    highlight: false,
    reqs: [
      "Never received a Santander switching bonus before",
      "Did not hold a Santander account on 1 Jan 2025",
      "Switch from a different bank (not Santander, Cahoot or Cater Allen)",
      "Start a full CASS switch within 60 days of opening",
      "Move at least 2 active Direct Debits",
      "Pay in at least £1,500",
    ],
    payout: "60–90 days after starting the switch",
    note: "Also earn 1% cashback on household bills — boosting total value to ~£205/yr.",
  },
  {
    bank: "Club Lloyds",
    bonus: "£200",
    extra: "+ lifestyle perks",
    highlight: false,
    reqs: [
      "No Lloyds, Halifax or Bank of Scotland switch bonus since 1 Jan 2023",
      "Open the account before the offer deadline",
      "Switch from another bank using CASS",
      "Transfer at least 3 Direct Debits",
      "Spend at least £100 on the debit card within the first few weeks",
    ],
    payout: "~45 days after opening",
    note: "Club Lloyds also includes a choice of lifestyle perk (e.g. Disney+, cinema tickets).",
  },
  {
    bank: "Barclays",
    bonus: "£200",
    extra: "",
    highlight: false,
    reqs: [
      "Open a sole Barclays account through the mobile app",
      "Pay in at least £2,000 within 30 days",
      "Start a full CASS switch and move at least 2 Direct Debits",
      "Switch must complete within 30 days of starting",
      "No recent Barclays account or previous Barclays switch bonus",
    ],
    payout: "~45 working days after meeting requirements",
    note: "Must apply through the app — web applications are not eligible.",
  },
  {
    bank: "First Direct",
    bonus: "£175",
    extra: "+ award-winning service",
    highlight: false,
    reqs: [
      "Never held any First Direct account before",
      "No HSBC current account opened since January 2018",
      "Switch from another bank within 45 days",
      "Move at least 2 Direct Debits or standing orders",
      "Pay in at least £1,000",
      "Make at least 5 debit card payments",
    ],
    payout: "The month after completing requirements",
    note: "First Direct consistently wins customer service awards — worth keeping as a long-term account.",
  },
  {
    bank: "NatWest",
    bonus: "£150",
    extra: "+ £36/yr cashback available",
    highlight: false,
    reqs: [
      "Must not currently hold a NatWest current account",
      "Never received a switch bonus from NatWest, RBS or Ulster Bank",
      "Open a new NatWest account before the deadline",
      "Complete a full CASS switch",
      "Pay in at least £1,250 and log into mobile banking within 60 days",
    ],
    payout: "~30 days after meeting conditions",
    note: "Reward account earns up to £36/yr cashback on bills — partially offsets the monthly fee.",
  },
];

const premierOffers = [
  {
    bank: "Lloyds Premier",
    bonus: "£500",
    extra: "",
    eligibility: "£5,000/month income or £100,000 with Lloyds",
    reqs: [
      "Open a Lloyds Premier account during the offer period",
      "Switch a current account with at least 3 Direct Debits",
      "Spend at least £200 on the debit card",
      "Pay in at least £5,000 in the first full calendar month, or hold £100,000 in savings/investments with Lloyds",
      "No Lloyds, Halifax or Bank of Scotland switch bonus since January 2023",
    ],
    payout: "45–90 days after completing requirements",
  },
  {
    bank: "Barclays Premier",
    bonus: "£400",
    extra: "",
    eligibility: "£75,000+ salary or £100,000 with Barclays",
    reqs: [
      "Open a Barclays Premier account through the app",
      "Pay in at least £4,000 within 30 days",
      "Start a full CASS switch with at least 2 Direct Debits",
      "Switch must complete within 30 days",
    ],
    payout: "~28 working days after meeting requirements",
  },
  {
    bank: "NatWest Premier",
    bonus: "£250",
    extra: "",
    eligibility: "£100,000+ income, £100,000 in savings, or large NatWest mortgage",
    reqs: [
      "Open a NatWest Premier Reward account",
      "Complete a full CASS switch",
      "Pay in at least £5,000 within 60 days of the switch",
      "Log into the mobile app within 60 days",
    ],
    payout: "~30 days after meeting criteria",
  },
  {
    bank: "HSBC Premier",
    bonus: "£250",
    extra: "",
    eligibility: "~£100,000 salary or £100,000 held with HSBC",
    reqs: [
      "Open a new HSBC Premier account",
      "Switch your current account within 90 days",
      "Have a qualifying salary paid into the account, or hold £100,000 with HSBC",
    ],
    payout: "~70 days after meeting requirements",
  },
];

function BonusBadge({ amount, extra }: { amount: string; extra: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>
        {amount}
      </span>
      {extra && (
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
          {extra}
        </span>
      )}
    </div>
  );
}

export default function BankSwitchingOffersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Updated 2025", "UK Only", "Always Free"].map((t) => (
              <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Bank Switch<br />Offers
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            The best current account switching bonuses available in the UK right now. Earn up to <strong style={{ color: "var(--foreground)" }}>£500</strong> just for switching — no catches.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: "£500", label: "Top bonus" },
              { value: "9", label: "Active offers" },
              { value: "£1,925", label: "Max stackable" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl" style={{ color: "var(--foreground)" }}>{s.value}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "var(--ink-40)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 py-5" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Disclaimer.</strong>{" "}
              Offers and eligibility criteria change frequently. Always verify terms directly with the bank before switching. This page is for informational purposes only — I am not a financial adviser. Some links may be referral links; I may receive a small reward at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* Standard Offers */}
      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border mb-4"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              Standard Offers
            </span>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Anyone can claim these
            </h2>
          </div>

          <div className="space-y-4">
            {standardOffers.map((offer) => (
              <div key={offer.bank}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {/* Header row */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-0">
                  <div className="p-6 sm:border-r flex flex-col justify-between gap-4"
                    style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="font-display text-xl mb-3" style={{ color: "var(--foreground)" }}>{offer.bank}</p>
                      <BonusBadge amount={offer.bonus} extra={offer.extra} />
                    </div>
                    <div className="text-xs rounded-xl px-3 py-2 inline-block"
                      style={{ background: "var(--muted)", color: "var(--ink-40)" }}>
                      Paid in {offer.payout}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "var(--ink-40)" }}>
                      Requirements
                    </p>
                    <ul className="space-y-2">
                      {offer.reqs.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm"
                          style={{ color: "var(--ink-60)", lineHeight: 1.6 }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ background: "var(--foreground)" }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                    {offer.note && (
                      <p className="mt-4 text-xs rounded-xl px-3 py-2"
                        style={{ background: "var(--muted)", color: "var(--ink-60)", lineHeight: 1.6 }}>
                        💡 {offer.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premier / High Earner Offers */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border mb-4"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              High Earner Offers
            </span>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: "var(--foreground)" }}>
              Premier bonuses
            </h2>
          </div>
          <p className="mb-12 max-w-2xl" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
            These accounts require a high income or significant savings — but offer bigger switching bonuses as a result.
          </p>

          <div className="space-y-4">
            {premierOffers.map((offer) => (
              <div key={offer.bank}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                <div className="grid sm:grid-cols-[200px_1fr] gap-0">
                  <div className="p-6 sm:border-r flex flex-col justify-between gap-4"
                    style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="font-display text-xl mb-3" style={{ color: "var(--foreground)" }}>{offer.bank}</p>
                      <BonusBadge amount={offer.bonus} extra={offer.extra} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs rounded-xl px-3 py-2"
                        style={{ background: "var(--muted)", color: "var(--ink-40)" }}>
                        Paid in {offer.payout}
                      </div>
                      <div className="text-xs rounded-xl px-3 py-2"
                        style={{ background: "var(--muted)", color: "var(--ink-60)" }}>
                        <span className="font-semibold">Eligibility: </span>{offer.eligibility}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest mb-3"
                      style={{ color: "var(--ink-40)" }}>
                      Requirements
                    </p>
                    <ul className="space-y-2">
                      {offer.reqs.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm"
                          style={{ color: "var(--ink-60)", lineHeight: 1.6 }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ background: "var(--foreground)" }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to switch CTA */}
      <section className="py-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color: "var(--foreground)" }}>
                Not sure how to switch?
              </h2>
              <p className="max-w-lg" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
                Read the full Bank Switching 101 guide — it covers the dummy account strategy, how to set up direct debits, and how to run multiple switches at once.
              </p>
            </div>
            <Link href="/guides/bank-switching-101"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "var(--foreground)", color: "var(--background)" }}>
              Read the guide
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
