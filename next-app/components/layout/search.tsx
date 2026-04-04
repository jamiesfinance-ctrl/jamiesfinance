"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { SEARCH_INDEX, SYNONYM_MAP, SUGGESTED_FALLBACK, type SearchItem } from "@/lib/search-index";

const fuse = new Fuse(SEARCH_INDEX, {
  keys: [
    { name: "title",       weight: 0.45 },
    { name: "description", weight: 0.30 },
    { name: "tags",        weight: 0.25 },
  ],
  threshold: 0.45,          // more generous matching
  distance: 200,             // allow matches further into strings
  minMatchCharLength: 2,
  includeScore: true,
  ignoreLocation: true,      // match anywhere in the string
});

// Expand query with synonyms before running through Fuse
function expandQuery(raw: string): string {
  const lower = raw.toLowerCase().trim();
  const extra: string[] = [];
  for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
    if (lower.includes(key)) {
      extra.push(...synonyms);
    }
  }
  return extra.length > 0 ? `${raw} ${extra.join(" ")}` : raw;
}

const TYPE_LABELS: Record<SearchItem["type"], string> = {
  tool:  "Tool",
  guide: "Guide",
  deal:  "Deals",
  page:  "Page",
};

const TYPE_COLORS: Record<SearchItem["type"], string> = {
  tool:  "#2563eb",
  guide: "#7c3aed",
  deal:  "#16a34a",
  page:  "var(--ink-40)",
};

const TYPE_ICONS: Record<SearchItem["type"], React.ReactNode> = {
  tool: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="4" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M4 4V3a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  guide: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2h10v10H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M4.5 5h5M4.5 7h5M4.5 9h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  deal: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5 9l4-4M5 5.5h.01M9 8.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  page: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 2h5.5L11 4.5V12H3V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8.5 2v3H11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
};

export function SearchButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all hover:opacity-80"
        style={{
          background:  "rgba(0,0,0,0.05)",
          borderColor: "var(--border)",
          color:       "var(--ink-40)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold"
          style={{ background: "var(--border)", color: "var(--ink-40)" }}>
          ⌘K
        </kbd>
      </button>
      {open && <SearchModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ResultRow({
  item,
  active,
  onHover,
  onClick,
}: {
  item: SearchItem;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onClick={onClick}
      className="w-full flex items-start gap-4 px-5 py-3.5 text-left transition-colors"
      style={{ background: active ? "var(--muted)" : "transparent" }}
    >
      <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${TYPE_COLORS[item.type]}18`, color: TYPE_COLORS[item.type] }}>
        {TYPE_ICONS[item.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{item.title}</span>
          <span className="flex-shrink-0 text-[0.6rem] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
            style={{ background: `${TYPE_COLORS[item.type]}18`, color: TYPE_COLORS[item.type] }}>
            {TYPE_LABELS[item.type]}
          </span>
        </div>
        <p className="text-xs line-clamp-1" style={{ color: "var(--ink-40)" }}>{item.description}</p>
      </div>
      <svg className="flex-shrink-0 mt-1 opacity-40" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery]           = useState("");
  const [activeIdx, setActiveIdx]   = useState(0);
  const inputRef                    = useRef<HTMLInputElement>(null);
  const router                      = useRouter();

  const trimmed = query.trim();

  // Run search with synonym expansion
  const results: SearchItem[] = trimmed.length >= 2
    ? fuse.search(expandQuery(trimmed)).slice(0, 8).map((r) => r.item)
    : [];

  const hasResults   = results.length > 0;
  const noResults    = trimmed.length >= 2 && !hasResults;
  const showSuggested = !trimmed || noResults;

  // Items navigated by keyboard
  const navItems = hasResults ? results : (showSuggested ? SUGGESTED_FALLBACK : []);

  const navigate = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, navItems.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && navItems[activeIdx]) navigate(navItems[activeIdx].href);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [navItems, activeIdx, navigate, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100]"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose} aria-hidden />

      {/* Modal */}
      <div className="fixed left-1/2 z-[101] w-full max-w-xl -translate-x-1/2 rounded-3xl overflow-hidden border shadow-2xl"
        style={{
          top:         "12vh",
          background:  "var(--card)",
          borderColor: "var(--border)",
          boxShadow:   "0 32px 80px -16px rgba(0,0,0,0.35)",
        }}>

        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: "var(--ink-40)", flexShrink: 0 }}>
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, guides, deals…"
            className="flex-1 bg-transparent outline-none text-base font-medium"
            style={{ color: "var(--foreground)" }}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs px-2 py-1 rounded-lg"
              style={{ color: "var(--ink-40)", background: "var(--muted)" }}>
              Clear
            </button>
          )}
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto">

          {/* Has results */}
          {hasResults && (
            <ul className="py-2">
              {results.map((item, i) => (
                <li key={item.href}>
                  <ResultRow item={item} active={i === activeIdx}
                    onHover={() => setActiveIdx(i)}
                    onClick={() => navigate(item.href)} />
                </li>
              ))}
            </ul>
          )}

          {/* No results — show explanation + "what you might like" */}
          {noResults && (
            <>
              <div className="px-5 pt-6 pb-3 text-center">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "var(--muted)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--ink-40)" }}/>
                    <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ color: "var(--ink-40)" }}/>
                    <path d="M9 7v2M9 11h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                  No results for &ldquo;{trimmed}&rdquo;
                </p>
                <p className="text-xs" style={{ color: "var(--ink-40)" }}>
                  Try different words — or browse what&apos;s available below.
                </p>
              </div>
              <div className="px-5 pb-2">
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--ink-40)" }}>
                  What you might like
                </p>
              </div>
              <ul className="pb-2">
                {SUGGESTED_FALLBACK.map((item, i) => (
                  <li key={item.href}>
                    <ResultRow item={item} active={i === activeIdx}
                      onHover={() => setActiveIdx(i)}
                      onClick={() => navigate(item.href)} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Empty state — no query yet */}
          {!trimmed && (
            <>
              <p className="px-5 pt-4 pb-2 text-[0.6875rem] font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                Suggested
              </p>
              <ul className="pb-2">
                {SUGGESTED_FALLBACK.map((item, i) => (
                  <li key={item.href}>
                    <ResultRow item={item} active={i === activeIdx}
                      onHover={() => setActiveIdx(i)}
                      onClick={() => navigate(item.href)} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-5 py-3 border-t" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
          {[["↵", "select"], ["↑↓", "navigate"], ["esc", "close"]].map(([key, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--ink-40)" }}>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-semibold border"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}>{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
