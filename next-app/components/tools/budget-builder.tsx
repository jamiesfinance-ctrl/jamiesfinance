"use client";

import { useState, useEffect, useRef } from "react";

function fmt(n: number) {
  return "£" + Math.round(Math.abs(n)).toLocaleString("en-GB");
}

type Category = { label: string; amount: number; };

type Section = {
  key: "needs" | "wants" | "savings";
  label: string;
  description: string;
  color: string;
  defaultPct: number;
  defaultCategories: Omit<Category, "amount">[];
};

const SECTIONS: Section[] = [
  {
    key: "needs",
    label: "Needs",
    description: "Essential expenses you cannot avoid",
    color: "#2563eb",
    defaultPct: 50,
    defaultCategories: [
      { label: "Rent / Mortgage" },
      { label: "Groceries" },
      { label: "Utilities & Bills" },
      { label: "Transport" },
      { label: "Insurance" },
      { label: "Minimum debt payments" },
    ],
  },
  {
    key: "wants",
    label: "Wants",
    description: "Nice to have, but not essential",
    color: "#f97316",
    defaultPct: 30,
    defaultCategories: [
      { label: "Eating out & takeaways" },
      { label: "Subscriptions (Netflix, Spotify…)" },
      { label: "Clothing & shopping" },
      { label: "Hobbies & entertainment" },
      { label: "Gym & fitness" },
      { label: "Holidays & travel" },
    ],
  },
  {
    key: "savings",
    label: "Savings",
    description: "Future you, investing, and emergencies",
    color: "#16a34a",
    defaultPct: 20,
    defaultCategories: [
      { label: "Emergency fund" },
      { label: "Stocks & Shares ISA" },
      { label: "Pension (extra contributions)" },
      { label: "House deposit fund" },
      { label: "Other savings goals" },
    ],
  },
];

type SectionState = {
  pct: number;
  categories: Category[];
};

function initCategories(section: Section, budget: number): Category[] {
  const total = (section.defaultPct / 100) * budget;
  const perCat = total / section.defaultCategories.length;
  return section.defaultCategories.map((c) => ({ ...c, amount: Math.round(perCat) }));
}

export function BudgetBuilder() {
  const [income, setIncome]           = useState(2_000);
  const [incomeInput, setIncomeInput] = useState("2000");
  const sliderRef = useRef<HTMLInputElement>(null);
  const INCOME_MAX = 10_000;

  const [sections, setSections] = useState<Record<string, SectionState>>(() =>
    Object.fromEntries(
      SECTIONS.map((s) => [s.key, { pct: s.defaultPct, categories: initCategories(s, 2_000) }])
    )
  );

  // Keep category totals in sync when income changes
  useEffect(() => {
    setSections((prev) => {
      const next = { ...prev };
      SECTIONS.forEach((s) => {
        const sectionTotal = (next[s.key].pct / 100) * income;
        const currentTotal = next[s.key].categories.reduce((a, c) => a + c.amount, 0);
        if (currentTotal === 0) return;
        // Scale proportionally
        next[s.key] = {
          ...next[s.key],
          categories: next[s.key].categories.map((c) => ({
            ...c,
            amount: Math.round((c.amount / currentTotal) * sectionTotal),
          })),
        };
      });
      return next;
    });
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--pct", `${Math.min(100, (income / INCOME_MAX) * 100)}%`);
    }
  }, [income]);

  const totalPct = SECTIONS.reduce((a, s) => a + sections[s.key].pct, 0);

  const setPct = (key: string, val: number) => {
    const others = SECTIONS.filter((s) => s.key !== key);
    const remaining = 100 - val;
    const otherTotal = others.reduce((a, s) => a + sections[s.key].pct, 0);
    setSections((prev) => {
      const next = { ...prev, [key]: { ...prev[key], pct: val } };
      if (otherTotal > 0) {
        others.forEach((s) => {
          next[s.key] = { ...next[s.key], pct: Math.round((prev[s.key].pct / otherTotal) * remaining) };
        });
      }
      return next;
    });
  };

  const setCategoryAmount = (sectionKey: string, idx: number, val: number) => {
    setSections((prev) => {
      const cats = [...prev[sectionKey].categories];
      cats[idx] = { ...cats[idx], amount: val };
      return { ...prev, [sectionKey]: { ...prev[sectionKey], categories: cats } };
    });
  };

  const remainder = income - SECTIONS.reduce((a, s) => a + sections[s.key].categories.reduce((b, c) => b + c.amount, 0), 0);

  return (
    <div className="space-y-8">

      {/* Income input */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Monthly Take-Home Pay</h2>
          <p className="text-xs mt-1" style={{ color: "var(--ink-40)" }}>Enter your net monthly income after tax</p>
        </div>
        <div className="p-7">
          <div className="flex items-center rounded-xl overflow-hidden border mb-4" style={{ borderColor: "var(--border)" }}>
            <span className="px-3 text-sm font-bold" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
            <input
              type="number" min={0} step={100}
              value={incomeInput}
              onChange={(e) => { setIncomeInput(e.target.value); const n = parseInt(e.target.value, 10); if (!isNaN(n) && n >= 0) setIncome(n); }}
              onBlur={() => setIncomeInput(String(income))}
              className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-lg font-bold"
              style={{ color: "var(--foreground)" }}
            />
            <span className="px-4 text-sm font-medium" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>/month</span>
          </div>
          <input ref={sliderRef} type="range" min={0} max={INCOME_MAX} step={100}
            value={income}
            onChange={(e) => { const v = Number(e.target.value); setIncome(v); setIncomeInput(String(v)); }} />
          <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}>
            <span>£0</span><span>£10,000/mo</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[{ label: "Needs (50%)", pct: 0.5, color: "#2563eb" }, { label: "Wants (30%)", pct: 0.3, color: "#f97316" }, { label: "Savings (20%)", pct: 0.2, color: "#16a34a" }].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center border" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                <p className="font-display text-xl" style={{ color: s.color }}>{fmt(income * s.pct)}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--ink-40)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split bar */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex justify-between text-xs font-semibold mb-3">
          {SECTIONS.map((s) => (
            <span key={s.key} style={{ color: s.color }}>{sections[s.key].pct}% {s.label}</span>
          ))}
        </div>
        <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "var(--muted)" }}>
          {SECTIONS.map((s) => (
            <div key={s.key} className="transition-all duration-500 first:rounded-l-full last:rounded-r-full"
              style={{ width: `${sections[s.key].pct}%`, background: s.color }} />
          ))}
        </div>
        {totalPct !== 100 && (
          <p className="text-xs mt-2" style={{ color: "#dc2626" }}>Percentages add up to {totalPct}% — adjust to reach 100%</p>
        )}
      </div>

      {/* Section cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {SECTIONS.map((s) => {
          const state = sections[s.key];
          const sectionTotal = Math.round((state.pct / 100) * income);
          const catTotal = state.categories.reduce((a, c) => a + c.amount, 0);
          const catRemainder = sectionTotal - catTotal;

          return (
            <div key={s.key} className="rounded-3xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: "var(--border)", borderTop: `3px solid ${s.color}` }}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-xl" style={{ color: s.color }}>{s.label}</h3>
                  <span className="font-display text-xl" style={{ color: "var(--foreground)" }}>{fmt(sectionTotal)}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--ink-40)" }}>{s.description}</p>

                {/* Pct adjuster */}
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => setPct(s.key, Math.max(0, state.pct - 5))}
                    className="w-7 h-7 rounded-lg text-sm font-bold border flex items-center justify-center transition-opacity hover:opacity-70"
                    style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>−</button>
                  <div className="flex-1 text-center text-sm font-bold" style={{ color: s.color }}>{state.pct}%</div>
                  <button onClick={() => setPct(s.key, Math.min(100, state.pct + 5))}
                    className="w-7 h-7 rounded-lg text-sm font-bold border flex items-center justify-center transition-opacity hover:opacity-70"
                    style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>+</button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {state.categories.map((cat, i) => (
                  <div key={cat.label} className="flex items-center gap-3">
                    <span className="text-xs flex-1 min-w-0 truncate" style={{ color: "var(--ink-60)" }}>{cat.label}</span>
                    <div className="flex items-center rounded-lg overflow-hidden border flex-shrink-0" style={{ borderColor: "var(--border)" }}>
                      <span className="px-2 text-xs" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>£</span>
                      <input
                        type="number" min={0} step={10}
                        value={cat.amount}
                        onChange={(e) => setCategoryAmount(s.key, i, Math.max(0, Number(e.target.value)))}
                        className="w-20 border-none outline-none bg-transparent px-2 py-1.5 text-xs font-semibold text-right"
                        style={{ color: "var(--foreground)" }}
                      />
                    </div>
                  </div>
                ))}

                {catRemainder !== 0 && (
                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs font-semibold" style={{ color: catRemainder >= 0 ? "#16a34a" : "#dc2626" }}>
                      {catRemainder >= 0 ? "Unallocated" : "Over budget"}
                    </span>
                    <span className="text-xs font-bold" style={{ color: catRemainder >= 0 ? "#16a34a" : "#dc2626" }}>
                      {catRemainder >= 0 ? "+" : "−"}{fmt(catRemainder)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="rounded-2xl p-6 border" style={{ background: remainder >= 0 ? "#f0fdf4" : "#fef2f2", borderColor: remainder >= 0 ? "#bbf7d0" : "#fecaca" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold" style={{ color: remainder >= 0 ? "#166534" : "#991b1b" }}>
              {remainder === 0 ? "Budget balanced" : remainder > 0 ? "Unallocated budget" : "Over budget"}
            </p>
            <p className="text-sm mt-0.5" style={{ color: remainder >= 0 ? "#16a34a" : "#dc2626", lineHeight: 1.6 }}>
              {remainder === 0
                ? "Every pound has a job — great budgeting."
                : remainder > 0
                ? `You have ${fmt(remainder)} unallocated — assign it to a category or add it to savings.`
                : `You're ${fmt(Math.abs(remainder))} over budget — reduce some categories.`}
            </p>
          </div>
          <span className="font-display text-3xl" style={{ color: remainder >= 0 ? "#16a34a" : "#dc2626" }}>
            {remainder >= 0 ? "+" : "−"}{fmt(Math.abs(remainder))}
          </span>
        </div>
      </div>

      <div className="rounded-2xl p-4 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--ink-40)", lineHeight: 1.7 }}>
          The 50/30/20 rule is a guideline, not a rule. If you live in London or have a high cost of living, your &ldquo;needs&rdquo; may naturally take more than 50%. Adjust the percentages to fit your reality. The goal is awareness — knowing where your money goes is the first step to taking control of it.
        </p>
      </div>
    </div>
  );
}
