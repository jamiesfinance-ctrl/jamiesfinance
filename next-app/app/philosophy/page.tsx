import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Philosophy — Jamie's Finance",
  description: "The values, beliefs, and philosophy behind Jamie's Finance — on change, knowledge, resilience, and the stoic approach to building a better financial future.",
};

const stoicQuotes = [
  {
    text: "We suffer more in imagination than in reality.",
    author: "Seneca",
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
  },
  {
    text: "It is not things that disturb us, but our interpretation of things.",
    author: "Epictetus",
  },
  {
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
  },
];

export default function PhilosophyPage() {
  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <Image
            src="/stoicism5.jpg"
            alt="A ship navigating a stormy sea — Gustave Doré"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Heavy gradient overlay — dark at bottom, less so at top */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.92) 80%, var(--background) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 pt-40">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Jamie&apos;s Finance — Personal Philosophy
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-none mb-8" style={{ color: "#f5f0e8" }}>
            What if<br />this does<br /><em>work?</em>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl" style={{ color: "rgba(245,240,232,0.65)", lineHeight: 1.8 }}>
            Most people ask &ldquo;what if it goes wrong?&rdquo; I ask the opposite. The stoics taught us that the obstacle is the path. This is how I think about money, knowledge, and the future.
          </p>
        </div>
      </section>

      {/* ── Opening quote ── */}
      <section className="py-24 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-px h-16 mx-auto mb-10" style={{ background: "var(--border)" }} />
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6" style={{ color: "var(--foreground)" }}>
            &ldquo;The impediment to action<br />advances action. What stands<br />in the way becomes the way.&rdquo;
          </blockquote>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
            — Marcus Aurelius
          </p>
          <div className="w-px h-16 mx-auto mt-10" style={{ background: "var(--border)" }} />
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-40)" }}>
            Core Values
          </p>
          <h2 className="font-display text-4xl sm:text-5xl mb-16" style={{ color: "var(--foreground)" }}>
            What I believe
          </h2>

          <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
            {[
              {
                num: "01",
                title: "Change is important.",
                body: "The world does not wait. Financial systems shift, technology evolves, and the rules of wealth-building are rewritten constantly. The people who thrive are those who embrace change rather than resist it — who update their thinking when the evidence demands it. Standing still is not safety. It is slow retreat.",
              },
              {
                num: "02",
                title: "Information should be freely accessible.",
                body: "Wealth has always been concentrated partly because knowledge about it was too. The financial industry has a long history of making things more complicated than they need to be. My job is to cut through that. Everyone deserves clear, honest, jargon-free information about their money — not just people who can afford an adviser.",
              },
              {
                num: "03",
                title: "In the age of AI, protect yourself.",
                body: "Artificial intelligence is rewriting careers, industries, and entire economies. The best protection is not fear — it is financial resilience. An emergency fund, a diversified investment portfolio, and an understanding of how money works will matter more in the next decade than at any point in modern history. Start now.",
              },
              {
                num: "04",
                title: "Investing has never mattered more.",
                body: "Wages are not keeping pace with the cost of living. Savings accounts lose value to inflation in real terms. The gap between those who invest and those who don't is widening every year. Now is not a bad time to start investing — it is the most important time. Not because it guarantees success, but because doing nothing guarantees falling behind.",
              },
            ].map((v) => (
              <div key={v.num} className="p-8 sm:p-10" style={{ background: "var(--card)" }}>
                <p className="font-display text-5xl mb-6" style={{ color: "var(--border)" }}>{v.num}</p>
                <h3 className="font-display text-xl sm:text-2xl mb-4" style={{ color: "var(--foreground)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image break ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/stoicismphilosophy.jpg"
          alt="Two hands reaching toward each other"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--card) 0%, transparent 25%, transparent 75%, var(--background) 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <blockquote className="text-center px-6 max-w-2xl">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight mb-4" style={{ color: "#f5f0e8", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
              &ldquo;We suffer more in imagination<br />than in reality.&rdquo;
            </p>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(245,240,232,0.55)", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>
              — Seneca
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Personal Mantra ── */}
      <section className="py-24 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-40)" }}>
              Personal Mantra
            </p>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-8" style={{ color: "var(--foreground)" }}>
              Never give up.<br />Always try.
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              This is not a motivational poster. It is a practical stance. The stoics did not tell you that everything would work out — they told you to act anyway, and to do so with full acceptance of what you cannot control.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              I have never met a person who succeeded by avoiding failure. Every outcome worth having sits on the other side of some number of attempts that did not go to plan. The question is not whether you will fail — it is whether you will stop when you do.
            </p>
          </div>

          <div className="space-y-6">
            {/* Failure card */}
            <div className="rounded-2xl p-7 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-display text-lg mb-3" style={{ color: "var(--foreground)" }}>Failure is the most important thing.</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
                Not because failure is good in itself — but because it is information. Every time something doesn&apos;t work, you learn something that no amount of planning could have taught you. The person who has failed more has usually learned more. Do not protect yourself from failure. Study it.
              </p>
            </div>

            {/* Glass half full card */}
            <div className="rounded-2xl p-7 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="font-display text-lg mb-3" style={{ color: "var(--foreground)" }}>&ldquo;What if this does work?&rdquo;</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
                Most people spend their energy imagining every way something can go wrong. I try to spend mine imagining what happens when it goes right — and then working backward from there. The stoic approach is not blind optimism. It is clear-eyed action in the direction of what you want, without attachment to the outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stoic Quotes grid ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-12 text-center" style={{ color: "var(--ink-40)" }}>
            Words that guide me
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {stoicQuotes.map((q) => (
              <div key={q.author + q.text.slice(0, 10)} className="rounded-2xl p-7 border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                <p className="font-display text-xl leading-snug mb-5" style={{ color: "var(--foreground)" }}>
                  &ldquo;{q.text}&rdquo;
                </p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                  — {q.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second image break ── */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/stoicism3.avif"
          alt="Stoic philosophy visual"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--card) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.5) 60%, var(--background) 100%)" }} />
      </section>

      {/* ── Why it connects to finance ── */}
      <section className="py-24 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-40)" }}>
            Why this connects to finance
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-10" style={{ color: "var(--foreground)" }}>
            Stoicism is the<br />ultimate money mindset.
          </h2>
          <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--ink-60)", lineHeight: 1.95 }}>
            <p>
              The market will fall. There will be months where your investments are worth less than you put in. Interest rates will change. Governments will make decisions that affect your wallet. None of this is in your control.
            </p>
            <p>
              What is in your control: how much you save, whether you invest, whether you educate yourself, and whether you panic or stay the course when things look uncertain. That is it. That is the whole game.
            </p>
            <p>
              Epictetus — born a slave, became one of the most influential philosophers in history — drew the same line. Focus your energy on what you can change. Release your grip on what you cannot. This is not resignation. It is the most productive stance available to you.
            </p>
            <p>
              Every guide I write, every tool I build, every piece of content I create is rooted in this: give people what they can control. Help them understand it. Help them act on it. The rest — the market, the economy, the news cycle — is noise.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 border-t" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <p className="font-display text-3xl sm:text-4xl mb-3" style={{ color: "var(--foreground)" }}>
              Ready to start?
            </p>
            <p className="text-sm" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
              The best time to begin was yesterday. The second best time is now.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/guides/start-investing-25-a-month"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{ background: "var(--foreground)", color: "var(--background)" }}>
              Start investing
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80 whitespace-nowrap"
              style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
              Back home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
