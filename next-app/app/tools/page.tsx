import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Free Tools & Calculators — Jamie's Finance",
  description: "Free, interactive financial tools. No sign-up required.",
};

const tools = [
  {
    id: "take-home-pay",
    title: "Take-Home Pay Calculator",
    description: "See exactly what you earn after income tax, National Insurance, and student loan. 2025/26 rates, all plans supported.",
    href: "/tools/take-home-pay",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="5" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M3 9h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M7 13h4M15 13h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    description: "See how your money grows over time with our interactive compound interest calculator.",
    href: "/tools/compound-interest",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <polyline points="2,16 7,10 11,13 18,5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="5" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Estimate monthly repayments, total interest paid, and see the impact of overpayments.",
    href: "/tools/mortgage-calculator",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M3 10L11 3l8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 10v8h4v-4h2v4h4v-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "student-loan",
    title: "Student Loan Simulator",
    description: "See how long your loan lasts, total repaid, and whether it'll be written off — for Plans 1, 2, 4 and 5.",
    href: "/tools/student-loan",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="M4 10.5v5.5c0 0 2.5 2 7 2s7-2 7-2V10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "budget-builder",
    title: "Budget Builder",
    description: "Enter your take-home pay and split it using the 50/30/20 rule. Adjust categories and percentages to fit your life.",
    href: "/tools/budget-builder",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M11 11L11 3M11 11L17.9 14.5M11 11L4.1 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "budget-planner",
    title: "Budget Planner",
    description: "Build a monthly budget, track spending categories, and find where your money is going.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M7 8h8M7 12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "savings-goal",
    title: "Savings Goal Tracker",
    description: "Set a savings target, pick a date, and see exactly how much you need to put away each month.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "isa-tracker",
    title: "ISA Allowance Tracker",
    description: "Track your annual ISA allowance usage across Cash ISAs and Stocks & Shares ISAs.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M7 6V5a4 4 0 0 1 8 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M11 11v3M9 12h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "503020",
    title: "50/30/20 Budget Split",
    description: "Enter your income and instantly see how to split it across needs, wants, and savings.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M11 11L11 3M11 11L17.9 14.5M11 11L4.1 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Planner",
    description: "Find out how much emergency fund you need and how long it will take you to build it.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3l7 4v4c0 4-3 7-7 8C7 18 4 15 4 11V7l7-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
        <path d="M8.5 11l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "investment-return",
    title: "Investment Return",
    description: "Compare different investment strategies and visualise projected returns over time.",
    href: null,
    live: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="3" y="13" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="9.5" y="9" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="16" y="5" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
  },
];

const liveCount = tools.filter((t) => t.live).length;

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden grain pt-32 pb-16 px-6"
        style={{ background: "var(--card)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal className="inline-flex mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.06)", color: "var(--foreground)", borderColor: "var(--border)" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
              Free Tools
            </span>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-[4.5rem] leading-none mb-6" style={{ color: "var(--foreground)" }}>
              Tools &amp; Calculators
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              Free, interactive tools to help you understand your money. No sign-up required — just open and use.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>All Tools</span>
            <div className="flex-1 border-t" style={{ borderColor: "var(--border)" }}/>
            <span className="text-xs font-semibold" style={{ color: "var(--ink-40)" }}>
              {liveCount} live · {tools.length - liveCount} coming soon
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, i) => {
              const delay = Math.min(i, 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
              const card = (
                <div
                  className="rounded-[20px] p-7 flex flex-col transition-all duration-300"
                  style={{
                    background: "var(--card)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    opacity: tool.live ? 1 : 0.5,
                    cursor: tool.live ? "pointer" : "not-allowed",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5 flex-shrink-0"
                    style={{
                      background: tool.live ? "var(--foreground)" : "rgba(0,0,0,0.05)",
                      color: tool.live ? "var(--background)" : "var(--ink-40)",
                    }}
                  >
                    {tool.icon}
                  </div>

                  {/* Badge */}
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
                      style={{
                        background: tool.live ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
                        color: tool.live ? "var(--foreground)" : "var(--ink-40)",
                        borderColor: tool.live ? "rgba(0,0,0,0.15)" : "var(--border)",
                      }}
                    >
                      {tool.live ? (
                        <><svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>Live</>
                      ) : "Coming soon"}
                    </span>
                  </div>

                  <h3 className="font-display text-lg mb-2" style={{ color: "var(--foreground)" }}>{tool.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--ink-60)" }}>{tool.description}</p>

                  {tool.live && (
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--foreground)" }}>
                      Open tool
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>
              );

              return (
                <ScrollReveal key={tool.id} delay={delay}>
                  {tool.live && tool.href ? (
                    <Link href={tool.href} className="block group [&>div]:hover:-translate-y-1 [&>div]:hover:shadow-xl transition-all">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
