import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { NewsletterForm } from "@/components/home/newsletter-form";

const offerCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="2" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 9h10M6 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: "Budgeting Guides",
    desc: "Learn how to track spending, set budgets, and build an emergency fund with practical step-by-step guides.",
    cta: "Read guides",
    href: "#guides",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3v2M7 4l1.5 1.5M4 8h2M4 14h2M7 18l1.5-1.5M11 17v2M15 18l-1.5-1.5M18 14h-2M18 8h-2M15 4l-1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    title: "Bank Switching Offers",
    desc: "Find the best bank switching bonuses and cashback offers available right now in the UK — updated regularly.",
    cta: "View offers",
    href: "/guides/bank-switching-101",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <polyline points="3,17 8,11 12,14 19,6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Investing Basics",
    desc: "S&S ISAs, index funds, and long-term investing explained simply. Start building wealth with as little as £25/month.",
    cta: "Start learning",
    href: "#guides",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M3 11a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M11 3v2M5.2 5.2l1.4 1.4M3 11H5M17 11h2M15.4 6.6l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M11 11l-3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: "Saving Money Tips",
    desc: "Everyday hacks and strategies to cut costs, earn cashback, and make the most of every pound you earn.",
    cta: "Save more",
    href: "#guides",
  },
];

const guides = [
  { category: "Investing", title: "How to Start Investing with Just £25/Month", desc: "A complete beginner's guide to index funds, S&S ISAs, and building long-term wealth in the UK.", read: "8 min read" },
  { category: "Budgeting", title: "The 50/30/20 Budget Rule — Does It Work in the UK?", desc: "Breaking down the most popular budgeting framework and how to adapt it for UK salaries and living costs.", read: "6 min read" },
  { category: "Banking", title: "Best Bank Switch Bonuses in the UK Right Now", desc: "Get paid up to £200 just for switching your current account. Here's exactly which deals are worth taking in 2025.", read: "5 min read" },
];

const stats = [
  { value: "10K+", label: "Monthly Readers" },
  { value: "50+", label: "Free Guides" },
  { value: "£1,000s", label: "Saved by Readers" },
  { value: "100%", label: "Independent" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden grain" style={{ background: "var(--card)" }}>
        <div aria-hidden className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)", transform: "translate(40%, -20%)" }} />
        <div aria-hidden className="absolute bottom-10 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)", transform: "translate(-40%, 20%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <ScrollReveal className="flex mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                  style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
                  UK Financial Education
                </span>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
                  Your Guide to<br />Smarter Money<br className="hidden sm:block" />Choices.
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <p className="text-base sm:text-lg max-w-lg mb-10" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
                  Practical guides on budgeting, investing, banking, and saving money — built for everyday people in the UK who want to make smarter financial decisions.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="#offers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "var(--foreground)", color: "var(--background)" }}>
                    Explore Guides
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <Link href="#signup"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:border-foreground"
                    style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
                    Join the Newsletter
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <div className="flex flex-wrap items-center gap-6">
                  {["Financial Education", "UK-Focused", "Always Free"].map((t, i) => (
                    <span key={t} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ink-60)" }}>
                      {i > 0 && <span className="hidden sm:block w-px h-4" style={{ background: "var(--border)" }} />}
                      {t}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Photo */}
            <ScrollReveal delay={2} className="flex justify-center md:justify-end">
              <div className="relative">
                <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, transparent 65%)", transform: "scale(1.35)" }} />
                <Image
                  src="/og.png"
                  alt="Jamie — founder of Jamie's Finance"
                  width={320} height={384}
                  className="relative rounded-3xl object-cover object-top w-64 h-72 sm:w-80 sm:h-96"
                  priority
                  style={{ boxShadow: "0 24px 64px -12px rgba(0,0,0,0.18)" }}
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ background: "var(--card)", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.12), 0 12px 36px -8px rgba(0,0,0,0.07)" }}>
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src="/og.png" alt="Jamie Schmidt" width={40} height={40} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Jamie Schmidt</p>
                    <p className="text-xs" style={{ color: "var(--ink-40)" }}>Founder, Jamie&apos;s Finance</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--ink-60)" }}>Scroll</span>
          <div className="w-px h-8 animate-pulse" style={{ background: "var(--ink-40)" }} />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y py-10 px-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.value} delay={i as 0|1|2|3} className="text-center">
              <p className="font-display text-4xl" style={{ color: "var(--foreground)" }}>{s.value}</p>
              <p className="text-sm mt-1 font-medium" style={{ color: "var(--ink-40)" }}>{s.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <ScrollReveal className="flex flex-col gap-4 items-center md:items-start">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse at 40% 60%, #555 0%, transparent 70%)", transform: "scale(1.15)" }} />
              <Image
                src="/church.png"
                alt="Jamie Schmidt — founder of Jamie's Finance"
                width={320} height={320}
                className="relative rounded-3xl object-cover object-top w-72 h-72 sm:w-80 sm:h-80"
                loading="lazy"
                style={{ boxShadow: "0 4px 24px -6px rgba(0,0,0,0.15)" }}
              />
              <div className="absolute -bottom-5 -right-5 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--card)", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.12), 0 12px 36px -8px rgba(0,0,0,0.07)" }}>
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src="/og.png" alt="Jamie Schmidt" width={40} height={40} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Jamie Schmidt</p>
                  <p className="text-xs" style={{ color: "var(--ink-40)" }}>Founder, Jamie&apos;s Finance</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border mb-5"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}>
                About Me
              </span>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="font-display text-4xl sm:text-5xl mb-6 leading-tight" style={{ color: "var(--foreground)" }}>
                Hi, I&apos;m Jamie.<br /><span className="italic">Money made simple.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="mb-5" style={{ color: "var(--ink-60)", lineHeight: 1.75 }}>
                I started Jamie&apos;s Finance to make financial education accessible to everyone — clear, honest, and jargon-free content that helps you understand your money without needing a degree or a financial background.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <p className="mb-8" style={{ color: "var(--ink-60)", lineHeight: 1.75 }}>
                Whether you&apos;re looking to switch to a better bank account, start learning about investing, or simply get on top of your budget — I create practical guides and resources to help you build financial knowledge right here in the UK.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={4}>
              <div className="flex flex-wrap gap-3">
                {["💰 Budgeting", "📈 Investing", "🏦 Banking", "🇬🇧 UK Focus"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ background: "var(--muted)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What I Offer ── */}
      <section id="offers" className="py-24 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal className="inline-flex mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}>
                What I Offer
              </span>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: "var(--foreground)" }}>
                Everything you need<br />to build financial knowledge
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="max-w-xl mx-auto" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
                From step-by-step educational guides to handy calculators, I&apos;ve built resources to help you understand and manage your money better.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={(i % 4) as 0|1|2|3}>
                <Link href={card.href}
                  className="block rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "var(--card)", boxShadow: "0 2px 8px -2px rgba(0,0,0,0.07)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)" }}>
                    {card.icon}
                  </div>
                  <h3 className="font-display text-xl mb-2" style={{ color: "var(--foreground)" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--ink-60)" }}>{card.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}

            {/* Tools card */}
            <ScrollReveal delay={2}>
              <Link href="/tools" className="block rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "var(--card)", boxShadow: "0 2px 8px -2px rgba(0,0,0,0.07)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                    <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                    <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 15.5h7M15.5 12v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl mb-2" style={{ color: "var(--foreground)" }}>Tools &amp; Calculators</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)" }}>Free compound interest calculator, mortgage calculator, and more tools to help you understand your money.</p>
              </Link>
            </ScrollReveal>

            {/* Featured digital products card */}
            <ScrollReveal delay={3}>
              <Link href="/guides/bank-switching-101"
                className="block rounded-2xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.22)" }}>
                <div className="absolute inset-0 opacity-10" aria-hidden style={{ background: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Ccircle cx=%2280%22 cy=%2220%22 r=%2250%22 fill=%22white%22/%3E%3C/svg%3E') no-repeat right -20px top -20px / 140px 140px" }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                    <path d="M11 2l2.5 5 5.5.8-4 3.9.95 5.5L11 14.65 6.05 17.2 7 11.7 3 7.8l5.5-.8L11 2Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl text-white mb-2">Digital Products</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>Free guides and resources — starting with Bank Switching 101, the complete playbook for earning cash from bank switches.</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  Read the guide
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Featured Guides ── */}
      <section id="guides" className="py-24 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border mb-4"
                  style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}>
                  Featured Guides
                </span>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <h2 className="font-display text-4xl sm:text-5xl" style={{ color: "var(--foreground)" }}>Popular reads</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g, i) => (
              <ScrollReveal key={g.title} delay={(i % 3) as 0|1|2}>
                <Link href="#" className="block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "var(--background)", boxShadow: "0 2px 8px -2px rgba(0,0,0,0.07)" }}>
                  <div className="relative h-44 overflow-hidden" style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)" }}>
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.20)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>{g.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-display text-xl text-white leading-tight">{g.title}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-60)" }}>{g.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium" style={{ color: "var(--ink-40)" }}>{g.read}</span>
                      <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Read →</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter signup ── */}
      <section id="signup" className="py-24 px-6" style={{ background: "var(--foreground)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl sm:text-5xl mb-4 text-white">Stay in the loop</h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.60)", lineHeight: 1.7 }}>
              Get the latest guides, bank switch offers, and money tips delivered to your inbox. Free, no spam.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <NewsletterForm />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Social / Contact ── */}
      <section id="contact" className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl mb-4" style={{ color: "var(--foreground)" }}>Find me online</h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="mb-10" style={{ color: "var(--ink-60)" }}>Follow along on social media or send me a message — I reply to everything.</p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "TikTok", href: "https://www.tiktok.com/@jamiesfinance" },
                { label: "YouTube", href: "https://www.youtube.com/@jamiesfinance" },
                { label: "Instagram", href: "https://www.instagram.com/jamiesfinance_" },
                { label: "WhatsApp", href: "https://wa.me/447404284953" },
                { label: "Email", href: "mailto:jamiesfinance@gmail.com" },
              ].map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener"
                  className="px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:border-foreground"
                  style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
