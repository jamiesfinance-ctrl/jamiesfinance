import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Credit Card Reviews — Jamie's Finance",
  description: "Honest, scored reviews of the best credit cards in the UK — from Amex rewards to beginner-friendly options.",
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? "#16a34a" :
    score >= 5 ? "#ca8a04" :
    "#dc2626";
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0"
      style={{ background: color, boxShadow: `0 4px 14px -4px ${color}99` }}>
      <span className="text-xl font-display leading-none text-white">{score}</span>
      <span className="text-[0.5rem] font-bold uppercase tracking-wider text-white opacity-80">/10</span>
    </div>
  );
}

function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
      style={{ background: color ? `${color}18` : "var(--muted)", color: color ?? "var(--ink-40)", borderColor: color ? `${color}40` : "var(--border)" }}>
      {label}
    </span>
  );
}

export default function CreditCardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/reviews" className="inline-flex items-center gap-2 text-xs font-semibold mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--ink-40)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Product Reviews
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Credit Card Reviews", "By @jamiesfinance"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Credit Card<br />Reviews
          </h1>
          <p className="text-xl max-w-2xl prose-body">
            Honest opinions and scores on the best (and worst) credit cards in the UK. Used responsibly — paid off in full every month — the right card earns you real money on spending you&apos;re already doing.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-6 py-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-5 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--ink-60)" }}>Important.</strong>{" "}
              Only use a credit card if you can pay the balance in full each month. Interest charges will always outweigh any rewards earned. This is financial education, not financial advice — always read the full terms before applying.{" "}
              Some links are referral or friend links.{" "}
              <Link href="/affiliate-disclosure" className="underline" style={{ color: "var(--ink-60)" }}>Read our affiliate disclosure.</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: American Express ── */}
      <section className="pt-16 pb-4 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>American Express</h2>
              <p className="text-sm mt-1" style={{ color: "var(--ink-40)" }}>The best rewards cards in the UK — if you can use them</p>
            </div>
          </div>
          {/* Amex acceptance notice */}
          <div className="rounded-2xl p-4 border flex items-start gap-3 mb-8" style={{ background: "#fffbeb", borderColor: "#fbbf2460" }}>
            <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16.5 15H1.5L9 2Z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 7v4" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="13" r="0.75" fill="#d97706"/>
            </svg>
            <p className="text-sm" style={{ color: "#92400e", lineHeight: 1.65 }}>
              <strong>American Express is not universally accepted in the UK.</strong> Some merchants — including Subway, Home Bargains, and KFC — do not accept it. If you rely on one card for everything, pair your Amex with a fee-free Mastercard or Visa as a backup.
            </p>
          </div>
        </div>
      </section>

      {/* Amex cards */}
      <section className="pb-10 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-6">
          <CardReview
            score={10}
            name="American Express Preferred Rewards Gold"
            tagline="The best all-round Amex card"
            image="/amex-gold-card.avif"
            badge="Top Rated"
            badgeColor="#16a34a"
            tags={[<Tag key="lounge" label="4x Lounge Access" color="#ca8a04"/>, <Tag key="deliveroo" label="£120 Deliveroo Credit" color="#ca8a04"/>]}
            href={null}
            ctaLabel="Referral link coming soon"
            review={
              <>
                <p>
                  The Amex Gold is the card I&apos;d give a 10/10 — for the right person. The core perks — four free airport lounge passes per year and £120 in annual Deliveroo credit — are worth more than the annual fee if you use them. For frequent travellers or regular Deliveroo customers, this is a no-brainer.
                </p>
                <p>
                  The catch: it only makes financial sense if you actually use those benefits. If you don&apos;t fly often or don&apos;t use Deliveroo, the BA Amex (free) is the smarter choice. Higher earners who spend a lot and travel a few times a year will love this card.
                </p>
              </>
            }
          />

          <CardReview
            score={9}
            name="British Airways American Express"
            tagline="The best free credit card in the UK"
            image="/ba-card.avif"
            badge="Best Free Card"
            badgeColor="#2563eb"
            tags={[<Tag key="free" label="No Annual Fee" color="#16a34a"/>, <Tag key="travel" label="Avios Rewards"/>]}
            href="https://americanexpress.com/en-gb/referral/ba-classic-credit?ref=jAMESShSvU&XL=MIMNS"
            ctaLabel="Apply with my referral link"
            review={
              <>
                <p>
                  In my view, the British Airways Amex is the best <strong>free</strong> credit card available in the UK right now. You earn Avios on every purchase with no annual fee to justify first.
                </p>
                <p>
                  The sign-up bonus alone is typically worth hundreds of pounds in flight value if you use Avios well. No fee means no break-even threshold to clear. If you&apos;re going to have one Amex, this is the one.
                </p>
              </>
            }
          />

          <CardReview
            score={8}
            name="Nectar American Express"
            tagline="Best for everyday spending that isn't travel"
            image="/nectar-card.avif"
            badge="Best for Non-Travellers"
            badgeColor="#7c3aed"
            tags={[<Tag key="fee" label="£30/year"/>, <Tag key="points" label="Nectar Points" color="#7c3aed"/>]}
            href="https://americanexpress.com/en-gb/referral/nectar-credit?ref=jAMESSjN3G&XLINK=MYCP"
            ctaLabel="Apply with my referral link"
            review={
              <>
                <p>
                  If you shop at Sainsbury&apos;s regularly and don&apos;t want to deal with travel points, the Nectar Amex is the best option for you. Nectar points are easy to understand and genuinely useful — off your shopping bill, at Argos, at Esso.
                </p>
                <p>
                  There is a £30 annual fee, but you&apos;ll cover that in a handful of shops. The welcome bonus on sign-up typically more than covers the first year&apos;s fee on its own.
                </p>
              </>
            }
          />

          <CardReview
            score={5}
            name="Barclaycard Avios"
            tagline="A Visa alternative for Avios collectors — but I'd stay clear"
            image="/barclaycard-avios.png"
            badge="Avoid"
            badgeColor="#dc2626"
            tags={[<Tag key="visa" label="Visa — Widely Accepted"/>, <Tag key="avios" label="Avios Points"/>]}
            href={null}
            ctaLabel="No referral link"
            review={
              <>
                <p>
                  If you want to earn Avios but can&apos;t get an Amex, the Barclaycard Avios exists as a Visa-based alternative. In practice, I&apos;d stay clear. The earn rate is lower than the BA Amex, the welcome bonus is less generous, and the value proposition doesn&apos;t hold up.
                </p>
                <p>
                  If your only issue with the BA Amex is acceptance, get the BA Amex and use a backup card like Monzo Flex for the rare merchant that doesn&apos;t take it.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 pb-2" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto border-t" style={{ borderColor: "var(--border)" }} />
      </div>

      {/* ── Section: Beginner Cards ── */}
      <section className="pt-14 pb-4 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Beginner &amp; Everyday Cards</h2>
          <p className="text-sm mt-1" style={{ color: "var(--ink-40)" }}>Widely accepted Mastercard/Visa options — great for building credit or spending abroad</p>
        </div>
      </section>

      <section className="pb-10 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-6">
          <CardReview
            score={9}
            name="Monzo Flex"
            tagline="My favourite beginner credit card"
            image="/monzo-flex.png"
            badge="Top Pick — Beginners"
            badgeColor="#16a34a"
            tags={[<Tag key="fx" label="0% FX Fees" color="#16a34a"/>, <Tag key="mc" label="Mastercard"/>]}
            href={null}
            ctaLabel="Search 'Monzo Flex' in the Monzo app"
            review={
              <>
                <p>
                  If you&apos;re new to credit cards, Monzo Flex is where I&apos;d start. It lives inside the Monzo app — you can see every transaction, set a repayment schedule, and freeze the card instantly from your phone.
                </p>
                <p>
                  The standout feature: <strong>0% foreign transaction fees</strong>. Most credit cards charge 2–3% on purchases made abroad. Monzo Flex charges nothing. It&apos;s a Mastercard, so accepted essentially everywhere. No annual fee. Easy to get approved. Highly recommended.
                </p>
              </>
            }
          />

          <CardReview
            score={4}
            name="Capital One Classic"
            tagline="A stepping stone for building your credit score"
            image="/capitalone.png"
            badge="Decent"
            badgeColor="#ca8a04"
            tags={[<Tag key="mc" label="Mastercard"/>, <Tag key="credit" label="Credit Building"/>]}
            href={null}
            ctaLabel="Apply on the Capital One website"
            review={
              <>
                <p>
                  Capital One Classic is a solid, unremarkable card designed for people who want to build or rebuild their credit score. The acceptance criteria are more lenient than premium cards, which makes it accessible.
                </p>
                <p>
                  No rewards, no perks, and a high interest rate if you carry a balance. But used correctly — small purchases, paid off in full — it does its job. Think of it as a stepping stone, not a destination.
                </p>
              </>
            }
          />

          <CardReview
            score={2}
            name="Aqua Classic"
            tagline="A last resort — only if you can't get anything else"
            image="/aqua-card.webp"
            badge="Last Resort"
            badgeColor="#dc2626"
            tags={[<Tag key="mc" label="Mastercard"/>, <Tag key="credit" label="Poor Credit Accepted"/>]}
            href={null}
            ctaLabel="Apply on the Aqua website"
            review={
              <>
                <p>
                  I wouldn&apos;t personally recommend Aqua. The interest rate is extremely high, there are no rewards, and the credit limit starts very low. If you&apos;ve been declined everywhere else and need a card to start building credit history, Aqua will accept you when others won&apos;t.
                </p>
                <p>
                  Use it strictly for one small automatic payment, paid off in full each month. Do not carry a balance. Upgrade as soon as you qualify for something better.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 pb-2" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto border-t" style={{ borderColor: "var(--border)" }} />
      </div>

      {/* ── Section: High Street Banks ── */}
      <section className="pt-14 pb-4 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto mb-6">
          <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>High Street Bank Cards</h2>
          <p className="text-sm mt-1" style={{ color: "var(--ink-40)" }}>Your bank will offer you a card. Nine times out of ten, it&apos;s not worth it.</p>
        </div>
      </section>

      <section className="pb-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* High street warning box */}
          <div className="rounded-2xl p-6 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Why I usually skip high street bank credit cards</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              Barclays, HSBC, NatWest, Lloyds — they all offer credit cards, and they&apos;ll nudge you toward them when you open a current account. The problem is that high street bank cards are almost always worse on rewards, worse on fees, and worse on sign-up bonuses than the specialist options above. You&apos;re essentially paying convenience tax for staying inside one ecosystem.
            </p>
            <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              The one exception worth knowing about:
            </p>
          </div>

          {/* Lloyds Ultra */}
          <div className="rounded-3xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 24px -6px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center gap-4 px-7 pt-6 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
              <ScoreBadge score={6} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest"
                    style={{ background: "#2563eb18", color: "#2563eb", border: "1px solid #2563eb40" }}>
                    High Street Exception
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl leading-tight" style={{ color: "var(--foreground)" }}>Lloyds Bank Ultra Credit Card</h3>
                <p className="text-sm mt-0.5" style={{ color: "var(--ink-40)" }}>The rare high street card that&apos;s actually competitive</p>
              </div>
            </div>
            <div className="p-7">
              <div className="flex flex-wrap gap-2 mb-5">
                <Tag label="1% Cashback (Year 1)" color="#16a34a"/>
                <Tag label="Visa"/>
              </div>
              <div className="space-y-3 text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
                <p>
                  The Lloyds Ultra stands out from its high street peers because it offers <strong style={{ color: "var(--foreground)" }}>1% cashback for the first year</strong> — which is genuinely competitive and beats most standard bank card offers. After year one the rate drops, so it&apos;s worth reassessing at renewal.
                </p>
                <p>
                  If you want to keep things simple and stay with your existing bank, the Lloyds Ultra is the one I&apos;d point to. But if you&apos;re willing to use a specialist card, Monzo Flex or one of the Amex options will almost certainly serve you better in the long run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6" style={{ background: "#141414" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-white mb-2">Looking for more ways to earn?</p>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              Bank switching bonuses pay up to £200 per switch — no rewards card needed.
            </p>
          </div>
          <Link href="/bank-switching-offers"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
            style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.85)" }}>
            View bank switch offers
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ── Card review component ── */
type CardReviewProps = {
  score: number;
  name: string;
  tagline: string;
  image: string | null;
  badge: string;
  badgeColor: string;
  tags: React.ReactNode[];
  href: string | null;
  ctaLabel: string;
  review: React.ReactNode;
};

function CardReview({ score, name, tagline, image, badge, badgeColor, tags, href, ctaLabel, review }: CardReviewProps) {
  return (
    <div className="rounded-3xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 24px -6px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center gap-4 px-7 pt-6 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
        <ScoreBadge score={score} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest"
              style={{ background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}40` }}>
              {badge}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl leading-tight" style={{ color: "var(--foreground)" }}>{name}</h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--ink-40)" }}>{tagline}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr]">
        <div className="flex items-center justify-center p-7 md:border-r" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          {image && (
            <div className="relative rounded-xl overflow-hidden"
              style={{ width: "180px", aspectRatio: "85.6/53.98", boxShadow: "0 6px 24px -6px rgba(0,0,0,0.25)" }}>
              <Image src={image} alt={name} fill className="object-cover" sizes="180px" />
            </div>
          )}
        </div>
        <div className="p-7 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-5">{tags}</div>
          <div className="space-y-3 text-sm flex-1" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
            {review}
          </div>
          <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--foreground)", color: "var(--background)" }}>
                {ctaLabel}
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border"
                style={{ borderColor: "var(--border)", color: "var(--ink-40)" }}>
                {ctaLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
