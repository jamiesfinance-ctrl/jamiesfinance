"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X, Leaf } from "lucide-react";

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
        {/* Left: theme toggle (hidden on homepage) + wordmark */}
        <div className="flex items-center gap-3">
          {mounted && !isHomePage && (
            <div ref={toggleRef} className="relative">
              <button
                onClick={toggleTheme}
                onContextMenu={handleContextMenu}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-transform hover:scale-110"
                style={{
                  background: currentTheme === "green" ? "rgba(55,130,55,0.10)" : "rgba(0,0,0,0.06)",
                  border: currentTheme === "green"
                    ? "1px solid rgba(55,130,55,0.30)"
                    : "1px solid rgba(0,0,0,0.12)",
                }}
              >
                {currentTheme === "dark" ? (
                  <Sun size={15} className="text-[#C0C0C0]" />
                ) : currentTheme === "green" ? (
                  <Leaf size={15} style={{ color: "#2d7a2d" }} />
                ) : (
                  <Moon size={15} className="text-[#444444]" />
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
            style={{ color: "var(--foreground)" }}
          >
            Jamie&apos;s Finance
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Guides", href: "/#guides" },
            { label: "Tools", href: "/tools" },
            { label: "About", href: "/#about" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--ink-60)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
          style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.12)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
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
        </div>
      )}
    </nav>
  );
}
