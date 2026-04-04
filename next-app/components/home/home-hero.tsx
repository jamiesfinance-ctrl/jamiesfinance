"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroCanvas } from "@/components/home/hero-canvas";

type HeroTheme = {
  bg: string;
  canvasColor: string;
  canvasBg: string;
  canvasTrail: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  h1: string;
  body: string;
  primaryBtn: { bg: string; color: string };
  secondaryBtn: { border: string; color: string };
  ghostBtn: { border: string; color: string };
  tagText: string;
  tagDivider: string;
  scroll: string;
  scrollLine: string;
};

const THEMES: Record<string, HeroTheme> = {
  dark: {
    bg: "#0a0a0a",
    canvasColor: "#cccccc",
    canvasBg: "#0a0a0a",
    canvasTrail: "rgba(0,0,0,0.08)",
    gradient: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.10) 100%)",
    badgeBg: "rgba(255,255,255,0.12)",
    badgeText: "rgba(255,255,255,0.85)",
    badgeBorder: "rgba(255,255,255,0.20)",
    h1: "#ffffff",
    body: "rgba(255,255,255,0.65)",
    primaryBtn: { bg: "white", color: "#141414" },
    secondaryBtn: { border: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.80)" },
    ghostBtn: { border: "rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.55)" },
    tagText: "rgba(255,255,255,0.65)",
    tagDivider: "rgba(255,255,255,0.25)",
    scroll: "rgba(255,255,255,0.6)",
    scrollLine: "rgba(255,255,255,0.6)",
  },
  light: {
    bg: "#f5f0e8",
    canvasColor: "#7a6a58",
    canvasBg: "#f5f0e8",
    canvasTrail: "rgba(245,240,232,0.15)",
    gradient: "linear-gradient(to right, rgba(245,240,232,0.85) 0%, rgba(245,240,232,0.50) 60%, rgba(245,240,232,0.10) 100%)",
    badgeBg: "rgba(20,20,20,0.07)",
    badgeText: "rgba(20,20,20,0.75)",
    badgeBorder: "rgba(20,20,20,0.15)",
    h1: "#141414",
    body: "rgba(20,20,20,0.65)",
    primaryBtn: { bg: "#141414", color: "#f5f0e8" },
    secondaryBtn: { border: "rgba(20,20,20,0.30)", color: "rgba(20,20,20,0.75)" },
    ghostBtn: { border: "rgba(20,20,20,0.15)", color: "rgba(20,20,20,0.50)" },
    tagText: "rgba(20,20,20,0.60)",
    tagDivider: "rgba(20,20,20,0.20)",
    scroll: "rgba(20,20,20,0.45)",
    scrollLine: "rgba(20,20,20,0.35)",
  },
  green: {
    bg: "#e8f4e8",
    canvasColor: "#3a6a3a",
    canvasBg: "#e8f4e8",
    canvasTrail: "rgba(232,244,232,0.15)",
    gradient: "linear-gradient(to right, rgba(232,244,232,0.85) 0%, rgba(232,244,232,0.50) 60%, rgba(232,244,232,0.10) 100%)",
    badgeBg: "rgba(55,130,55,0.10)",
    badgeText: "rgba(26,58,26,0.80)",
    badgeBorder: "rgba(55,130,55,0.25)",
    h1: "#1a3a1a",
    body: "rgba(26,58,26,0.65)",
    primaryBtn: { bg: "#2d7a2d", color: "#ffffff" },
    secondaryBtn: { border: "rgba(55,130,55,0.40)", color: "rgba(26,58,26,0.80)" },
    ghostBtn: { border: "rgba(55,130,55,0.20)", color: "rgba(26,58,26,0.55)" },
    tagText: "rgba(26,58,26,0.60)",
    tagDivider: "rgba(55,130,55,0.30)",
    scroll: "rgba(26,58,26,0.45)",
    scrollLine: "rgba(55,130,55,0.45)",
  },
};

export function HomeHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const t = THEMES[mounted ? (resolvedTheme ?? "dark") : "dark"];

  return (
    <section
      className="relative min-h-screen flex items-center px-6 pt-24 pb-20 overflow-hidden"
      style={{ background: t.bg }}
    >
      {/* Flow-field canvas */}
      <HeroCanvas color={t.canvasColor} bgColor={t.canvasBg} trailColor={t.canvasTrail} />

      {/* Gradient overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: t.gradient }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <ScrollReveal className="flex mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{ background: t.badgeBg, color: t.badgeText, borderColor: t.badgeBorder }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
                UK Financial Education
              </span>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-6" style={{ color: t.h1 }}>
                Your Guide to<br />Smarter Money<br className="hidden sm:block" />Choices.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="text-base sm:text-lg max-w-lg mb-10" style={{ color: t.body, lineHeight: 1.7 }}>
                Practical guides on budgeting, investing, banking, and saving money — built for everyday people in the UK who want to make smarter financial decisions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="#offers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ background: t.primaryBtn.bg, color: t.primaryBtn.color }}
                >
                  Explore Guides
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link
                  href="#signup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
                  style={{ borderColor: t.secondaryBtn.border, color: t.secondaryBtn.color }}
                >
                  Join the Newsletter
                </Link>
                <Link
                  href="/philosophy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
                  style={{ borderColor: t.ghostBtn.border, color: t.ghostBtn.color }}
                >
                  My Philosophy
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="flex flex-wrap items-center gap-6">
                {["Financial Education", "UK-Focused", "Always Free"].map((tag, i) => (
                  <span key={tag} className="flex items-center gap-2 text-sm font-medium" style={{ color: t.tagText }}>
                    {i > 0 && <span className="hidden sm:block w-px h-4" style={{ background: t.tagDivider }} />}
                    {tag}
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
              <div
                className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--card)", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.12), 0 12px 36px -8px rgba(0,0,0,0.07)" }}
              >
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
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: t.scroll }}>Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ background: t.scrollLine }} />
      </div>
    </section>
  );
}
