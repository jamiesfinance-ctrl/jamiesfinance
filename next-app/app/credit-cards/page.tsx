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
    score >= 6 ? "#ca8a04" :
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
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {["Product Reviews", "By @jamiesfinance"].map((t) => (
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
              Only use a credit card if you can pay the balance in full each month. Interest charges will always outweigh any rewards. This is not financial advice. Some links are referral links — applying through them may earn both of us a bonus at no extra cost to you.
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
      <section className="pb-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-6">

          {/* BA Amex */}
          <CardReview
            score={9}
            name="British Airways American Express"
            tagline="The best free credit card in the UK"
            image="/ba-card.avif"
            badge="Top Pick"
            badgeColor="#16a34a"
            tags={[<Tag key="free" label="No Annual Fee" color="#16a34a"/>, <Tag key="travel" label="Travel Rewards"/>]}
            href="https://americanexpress.com/en-gb/referral/ba-classic-credit?ref=jAMESShSvU&XL=MIMNS"
            ctaLabel="Apply with my referral link"
            review={
              <>
                <p>
                  In my view, the British Airways Amex is the best <strong>free</strong> credit card available in the UK right now. You earn Avios on every purchase — points that can be redeemed for flights, upgrades, and hotel stays — with no annual fee to justify first.
                </p>
                <p>
                  The sign-up bonus alone is typically worth hundreds of pounds in flight value if you use Avios well. And because there&apos;s no fee, there&apos;s no break-even threshold to clear. You either earn something or you don&apos;t — you can&apos;t lose.
                </p>
                <p>
                  If you&apos;re going to have one Amex, this is the one.
                </p>
              </>
            }
          />

          {/* Nectar Amex */}
          <CardReview
            score={9}
            name="Nectar American Express"
            tagline="The best card for everyday spending that isn't travel"
            image="/nectar-card.avif"
            badge="Best for Non-Travellers"
            badgeColor="#7c3aed"
            tags={[<Tag key="fee" label="£30/year"/>, <Tag key="points" label="Nectar Points" color="#7c3aed"/>]}
            href="https://americanexpress.com/en-gb/referral/nectar-credit?ref=jAMESSjN3G&XLINK=MYCP"
            ctaLabel="Apply with my referral link"
            review={
              <>
                <p>
                  If you shop at Sainsbury&apos;s regularly and don&apos;t want to deal with travel points, the Nectar Amex is probably the best credit card in the UK for you. Nectar points are easy to understand and genuinely useful — off your shopping bill, at Argos, at Esso.
                </p>
                <p>
                  There is a £30 annual fee, but you&apos;ll cover that in a handful of shops if you&apos;re spending regularly. The bonus Nectar points offer on sign-up typically more than covers the first year&apos;s fee on its own.
                </p>
                <p>
                  Points-wise, this earns better than a basic cashback card for most people&apos;s shopping habits.
                </p>
              </>
            }
          />

          {/* Amex Gold */}
          <CardReview
            score={8}
            name="American Express Preferred Rewards Gold"
            tagline="Worth it — but only if you'll actually use the perks"
            image="/amex-gold-card.avif"
            badge="Premium"
            badgeColor="#ca8a04"
            tags={[<Tag key="lounge" label="4x Lounge Access" color="#ca8a04"/>, <Tag key="deliveroo" label="£120 Deliveroo Credit" color="#ca8a04"/>]}
            href={null}
            ctaLabel="Referral link coming soon"
            review={
              <>
                <p>
                  The Amex Gold is genuinely excellent for the right person. The core perks — four free airport lounge passes per year and £120 in annual Deliveroo credit — are worth more than the card&apos;s annual fee if you use them. For frequent travellers or regular Deliveroo customers, this is a no-brainer.
                </p>
                <p>
                  The catch: it only makes financial sense if you actually use those benefits. If you don&apos;t fly often or don&apos;t use Deliveroo, you&apos;re paying for perks you won&apos;t redeem. In that case, the BA Amex (free) is the better choice.
                </p>
                <p>
                  Higher earners who spend a lot and travel a few times a year will love this card. Everyone else should probably look elsewhere.
                </p>
              </>
            }
          />

          {/* Barclaycard Avios */}
          <CardReview
            score={5}
            name="Barclaycard Avios"
            tagline="A Visa alternative for Avios collectors — but I'd stay clear"
            image="/barclaycard-avios.png"
            imageRotate
            badge="Avoid"
            badgeColor="#dc2626"
            tags={[<Tag key="visa" label="Visa — Widely Accepted"/>, <Tag key="avios" label="Avios Points"/>]}
            href={null}
            ctaLabel="No referral link"
            review={
              <>
                <p>
                  If you want to earn Avios but can&apos;t get an Amex — or want a card that&apos;s accepted everywhere — the Barclaycard Avios exists as a Visa-based alternative. In theory, it solves the Amex acceptance problem.
                </p>
                <p>
                  In practice, I&apos;d stay clear. The earn rate is lower than the BA Amex, the welcome bonus is less generous, and the value proposition just doesn&apos;t hold up well by comparison. There are better Visa/Mastercard options out there, and better Avios options too.
                </p>
                <p>
                  If your only issue with the BA Amex is acceptance, get the BA Amex and use a backup card like Monzo Flex for anywhere that doesn&apos;t take it.
                </p>
              </>
            }
          />
        </div>
      </section>

      {/* Divider */}
      <div className="px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto border-t" style={{ borderColor: "var(--border)" }} />
      </div>

      {/* ── Section: Beginner Cards ── */}
      <section className="pt-14 pb-4 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="font-display text-3xl sm:text-4xl" style={{ color: "var(--foreground)" }}>Beginner &amp; Everyday Cards</h2>
          <p className="text-sm mt-1" style={{ color: "var(--ink-40)" }}>Widely accepted Mastercard/Visa options for building credit or spending abroad</p>
        </div>
      </section>

      <section className="pb-20 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Monzo Flex */}
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
                  If you&apos;re new to credit cards, Monzo Flex is where I&apos;d start. It sits inside the Monzo app you might already use, which makes it incredibly easy to manage — you can see every transaction, set a repayment schedule, and freeze the card instantly from your phone.
                </p>
                <p>
                  The standout feature for me is the <strong>0% foreign transaction fees</strong>. Most credit cards charge 2–3% on every purchase made abroad. Monzo Flex charges nothing, which makes it one of the best travel spending cards available at any level, let alone for a beginner product.
                </p>
                <p>
                  It&apos;s a Mastercard, so accepted essentially everywhere. No annual fee. Easy to get approved for. Highly recommended.
                </p>
              </>
            }
          />

          {/* Capital One */}
          <CardReview
            score={6}
            name="Capital One Classic"
            tagline="A decent option for building your credit score"
            image="/capitalone.png"
            badge="Decent"
            badgeColor="#ca8a04"
            tags={[<Tag key="mc" label="Mastercard"/>, <Tag key="credit" label="Credit Building"/>]}
            href={null}
            ctaLabel="Apply on the Capital One website"
            review={
              <>
                <p>
                  Capital One Classic is a solid, unremarkable credit card. It&apos;s designed primarily for people who want to build or rebuild their credit score — the acceptance criteria are more lenient than premium cards, which makes it accessible.
                </p>
                <p>
                  There are no rewards, no perks, and the interest rate is high if you carry a balance. But used correctly — small purchases, paid off in full each month — it does its job. Your credit score improves, and you eventually qualify for better cards.
                </p>
                <p>
                  Think of it as a stepping stone, not a destination.
                </p>
              </>
            }
          />

          {/* Aqua */}
          <CardReview
            score={3}
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
                  I wouldn&apos;t personally recommend Aqua. It&apos;s targeted at people with very poor or no credit history, and it shows — the interest rate is extremely high, there are no rewards, and the credit limit starts low.
                </p>
                <p>
                  That said, I understand it exists for a reason. If you&apos;ve been declined everywhere else and you need a card to start building your credit history, Aqua will accept you when others won&apos;t. Used strictly as a direct debit for one small monthly payment — paid off automatically in full — it&apos;s a mechanism for improving your credit score over time.
                </p>
                <p>
                  Do not carry a balance on this card. The interest rate will hurt you. Use it only if it&apos;s your only option, and upgrade as soon as you can.
                </p>
              </>
            }
          />
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

/* ── Reusable card review component ── */
type CardReviewProps = {
  score: number;
  name: string;
  tagline: string;
  image: string | null;
  imageRotate?: boolean;
  imagePlaceholder?: { gradient: string; label: string };
  badge: string;
  badgeColor: string;
  tags: React.ReactNode[];
  href: string | null;
  ctaLabel: string;
  review: React.ReactNode;
};

function CardReview({
  score, name, tagline, image, imageRotate, imagePlaceholder,
  badge, badgeColor, tags, href, ctaLabel, review,
}: CardReviewProps) {
  return (
    <div className="rounded-3xl overflow-hidden border" style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 24px -6px rgba(0,0,0,0.08)" }}>
      {/* Top bar */}
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

      <div className="grid md:grid-cols-[220px_1fr] gap-0">
        {/* Card image */}
        <div className="flex items-center justify-center p-7 md:border-r" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          {image ? (
            <div className={`relative rounded-xl overflow-hidden ${imageRotate ? "" : ""}`}
              style={imageRotate
                ? { width: "139px", height: "220px", overflow: "hidden", borderRadius: "12px", boxShadow: "0 6px 24px -6px rgba(0,0,0,0.25)" }
                : { width: "180px", aspectRatio: "85.6/53.98", borderRadius: "12px", overflow: "hidden", boxShadow: "0 6px 24px -6px rgba(0,0,0,0.25)" }
              }>
              {imageRotate ? (
                <Image
                  src={image}
                  alt={name}
                  width={400}
                  height={566}
                  style={{ transform: "rotate(90deg)", transformOrigin: "center", width: "220px", height: "139px", position: "absolute", top: "calc(50% - 69.5px)", left: "calc(50% - 110px)" }}
                />
              ) : (
                <Image src={image} alt={name} fill className="object-cover" sizes="180px" />
              )}
            </div>
          ) : imagePlaceholder ? (
            <div className="w-[180px] rounded-xl flex items-center justify-center"
              style={{ aspectRatio: "85.6/53.98", background: imagePlaceholder.gradient, boxShadow: "0 6px 24px -6px rgba(0,0,0,0.25)" }}>
              <span className="text-white font-display text-lg font-bold">{imagePlaceholder.label}</span>
            </div>
          ) : null}
        </div>

        {/* Review text */}
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
