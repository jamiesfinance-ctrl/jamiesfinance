"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X, Leaf } from "lucide-react";
import { SearchButton } from "@/components/layout/search";

function navBg(theme: string | undefined, scrolled: boolean) {
  if (!scrolled) return "transparent";
  if (theme === "dark")  return "rgba(17,17,17,0.92)";
  if (theme === "green") return "rgba(240,249,240,0.92)";
  return "rgba(248,248,248,0.92)";
}

function menuBg(theme: string | undefined) {
  if (theme === "dark")  return "rgba(17,17,17,0.97)";
  if (theme === "green") return "rgba(240,249,240,0.97)";
  return "rgba(248,248,248,0.97)";
}

export function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [greenMenuOpen, setGreenMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";
  const currentTheme = theme || resolvedTheme || "light";

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close green menu when clicking outside
  useEffect(() => {
    if (!greenMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setGreenMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [greenMenuOpen]);

  const toggleTheme = () => {
    if (currentTheme === "green") {
      setTheme("light");
    } else {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };

  // Easter egg: right-click opens the green mode picker 🌿
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setGreenMenuOpen((prev) => !prev);
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg(currentTheme, scrolled),
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: theme toggle + wordmark */}
        <div className="flex items-center gap-3">
          {mounted && (
            <div ref={toggleRef} className="relative">
              <button
                onClick={toggleTheme}
                onContextMenu={handleContextMenu}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-transform hover:scale-110"
                style={{
                  background: currentTheme === "green"
                    ? "rgba(55,130,55,0.10)"
                    : isHomePage && !scrolled && currentTheme !== "light"
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.06)",
                  border: currentTheme === "green"
                    ? "1px solid rgba(55,130,55,0.30)"
                    : isHomePage && !scrolled && currentTheme !== "light"
                      ? "1px solid rgba(255,255,255,0.20)"
                      : "1px solid rgba(0,0,0,0.12)",
                }}
              >
                {currentTheme === "dark" ? (
                  <Sun size={15} style={{ color: isHomePage && !scrolled ? "#e0e0e0" : "#C0C0C0" }} />
                ) : currentTheme === "green" ? (
                  <Leaf size={15} style={{ color: "#2d7a2d" }} />
                ) : (
                  <Moon size={15} style={{ color: "#444444" }} />
                )}
              </button>

              {/* Easter egg popover */}
              {greenMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-2xl border shadow-xl overflow-hidden z-50"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    minWidth: "168px",
                    boxShadow: "0 8px 32px -8px rgba(0,0,0,0.18)",
                  }}
                >
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest"
                      style={{ color: "var(--ink-40)" }}>
                      Secret Theme
                    </p>
                  </div>
                  {currentTheme !== "green" ? (
                    <button
                      onClick={() => { setTheme("green"); setGreenMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-3 text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--foreground)" }}
                    >
                      <Leaf size={14} style={{ color: "#2d7a2d" }} />
                      Enable Green Mode
                    </button>
                  ) : (
                    <button
                      onClick={() => { setTheme("light"); setGreenMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-3 text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--foreground)" }}
                    >
                      <X size={14} />
                      Exit Green Mode
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          <Link
            href="/"
            className="font-display text-lg leading-none"
            style={{ color: isHomePage && !scrolled && currentTheme !== "light" ? "#ffffff" : "var(--foreground)" }}
          >
            Jamie&apos;s Finance
          </Link>
        </div>

        {/* Search */}
        <div className="hidden sm:block">
          <SearchButton />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Guides", href: "/#guides" },
            { label: "Tools", href: "/tools" },
            { label: "Deals", href: "/deals" },
            { label: "About", href: "/#about" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: isHomePage && !scrolled && currentTheme !== "light" ? "rgba(255,255,255,0.75)" : "var(--ink-60)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
            style={isHomePage && !scrolled && currentTheme !== "light"
              ? { background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" }
              : { background: "var(--foreground)", color: "var(--background)" }
            }
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile: search + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="sm:hidden"><SearchButton /></div>
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
          style={{
            background: isHomePage && !scrolled && currentTheme !== "light" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
            border: isHomePage && !scrolled && currentTheme !== "light" ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(0,0,0,0.12)",
            color: isHomePage && !scrolled && currentTheme !== "light" ? "#e0e0e0" : "var(--foreground)",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: menuBg(currentTheme) }}
        >
          {[
            { label: "Guides", href: "/#guides" },
            { label: "Tools", href: "/tools" },
            { label: "Deals", href: "/deals" },
            { label: "About", href: "/#about" },
            { label: "Get in touch", href: "/#contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium py-2 border-b"
              style={{ color: "var(--foreground)", borderColor: "var(--border)" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme controls */}
          {mounted && (
            <div className="pt-2 flex flex-col gap-2">
              <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                Appearance
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all"
                  style={{
                    background: currentTheme === "light" ? "var(--foreground)" : "transparent",
                    color: currentTheme === "light" ? "var(--background)" : "var(--ink-60)",
                    borderColor: currentTheme === "light" ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  <Sun size={13} />
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all"
                  style={{
                    background: currentTheme === "dark" ? "var(--foreground)" : "transparent",
                    color: currentTheme === "dark" ? "var(--background)" : "var(--ink-60)",
                    borderColor: currentTheme === "dark" ? "var(--foreground)" : "var(--border)",
                  }}
                >
                  <Moon size={13} />
                  Dark
                </button>
                <button
                  onClick={() => setTheme("green")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all"
                  style={{
                    background: currentTheme === "green" ? "#2d7a2d" : "transparent",
                    color: currentTheme === "green" ? "#ffffff" : "var(--ink-60)",
                    borderColor: currentTheme === "green" ? "#2d7a2d" : "var(--border)",
                  }}
                >
                  <Leaf size={13} />
                  Green
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
