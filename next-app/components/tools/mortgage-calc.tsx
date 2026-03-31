"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CalcEngine, fmtGBP, fmtDate, fmtMonths, type AmortRow, type YearlySummary } from "@/lib/calc-engine";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const DEFAULTS = {
  price: 300000, deposit: 60000, depPct: 20,
  term: 25, rate: 4.5, type: "repayment" as "repayment" | "interest-only",
  overpay: 0, startDate: "",
};

const PAGE_SIZE = 24;

function NumField({
  prefix, suffix, value, onChange, min, max, step, id,
}: {
  prefix?: string; suffix?: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; id?: string;
}) {
  return (
    <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      {prefix && <span className="px-3 py-3 text-sm font-bold flex-shrink-0" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>{prefix}</span>}
      <input
        id={id}
        type="number" min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 border-none outline-none bg-transparent px-4 py-3 text-sm font-semibold w-0"
        style={{ color: "var(--foreground)" }}
      />
      {suffix && <span className="px-3 py-3 text-sm font-bold flex-shrink-0" style={{ color: "var(--ink-40)", background: "var(--muted)" }}>{suffix}</span>}
    </div>
  );
}

function RcCard({ label, value, sub, featured }: { label: string; value: string; sub?: string; featured?: boolean }) {
  return (
    <div className="rounded-2xl p-5" style={{
      background: featured ? "var(--foreground)" : "var(--card)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <p className="text-[0.6875rem] font-bold uppercase tracking-widest mb-2"
        style={{ color: featured ? "rgba(255,255,255,0.50)" : "var(--ink-40)" }}>
        {label}
      </p>
      <p className="font-display text-3xl leading-none" style={{ color: featured ? "#fff" : "var(--foreground)" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: featured ? "rgba(255,255,255,0.40)" : "var(--ink-40)" }}>{sub}</p>}
    </div>
  );
}

export function MortgageCalc() {
  const [s, setS] = useState({ ...DEFAULTS });
  const [page, setPage] = useState(0);
  const termRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<typeof DEFAULTS>) => setS((prev) => ({ ...prev, ...patch }));

  const onPriceChange = (price: number) => {
    const deposit = Math.round((s.depPct / 100) * price);
    update({ price, deposit });
  };
  const onDepositChange = (deposit: number) => {
    const depPct = s.price > 0 ? Math.round((deposit / s.price) * 100 * 10) / 10 : 0;
    update({ deposit, depPct });
  };
  const onDepPctChange = (depPct: number) => {
    const deposit = Math.round((depPct / 100) * s.price);
    update({ deposit, depPct });
  };

  const updateSlider = (el: HTMLInputElement | null, val: number, min: number, max: number) => {
    if (!el) return;
    el.style.setProperty("--pct", `${((val - min) / (max - min)) * 100}%`);
  };

  useEffect(() => { updateSlider(termRef.current, s.term, 1, 40); }, [s.term]);
  useEffect(() => { updateSlider(rateRef.current, s.rate, 0.1, 15); }, [s.rate]);

  const loan = Math.max(0, s.price - s.deposit);
  const isIO = s.type === "interest-only";
  const monthly = isIO
    ? CalcEngine.monthlyInterestOnly(loan, s.rate)
    : CalcEngine.monthlyRepayment(loan, s.rate, s.term);
  const schedule = CalcEngine.buildSchedule(loan, s.rate, s.term, monthly, s.overpay, isIO, s.startDate);
  const totalInterest = schedule.reduce((a, r) => a + r.interest, 0);
  const totalPaid = schedule.reduce((a, r) => a + r.payment, 0);
  const endDate = schedule.length > 0 ? schedule[schedule.length - 1].date : null;
  const ltv = s.price > 0 ? Math.round((loan / s.price) * 100) : 0;
  const principalPct = totalPaid > 0 ? Math.round((loan / totalPaid) * 100) : 0;

  const yearly = CalcEngine.summariseByYear(schedule);
  const savings = s.overpay > 0
    ? CalcEngine.overpaymentSavings(loan, s.rate, s.term, monthly, s.overpay, isIO, s.startDate)
    : null;

  const totalPages = Math.ceil(schedule.length / PAGE_SIZE);
  const pageRows = schedule.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const downloadCSV = useCallback(() => {
    const rows = [
      ["Jamie's Finance — Mortgage Calculator"],
      ["Property Price", fmtGBP(s.price)],
      ["Deposit", fmtGBP(s.deposit)],
      ["Loan Amount", fmtGBP(loan)],
      ["Interest Rate", `${s.rate}%`],
      ["Term", `${s.term} years`],
      ["Type", s.type],
      ["Monthly Payment", fmtGBP(monthly, 2)],
      ["Total Interest", fmtGBP(totalInterest)],
      ["Total Paid", fmtGBP(totalPaid)],
      [],
      ["Month", "Date", "Payment", "Interest", "Principal", "Overpayment", "Balance"],
      ...schedule.map((r) => [r.month, fmtDate(r.date) ?? "", fmtGBP(r.payment, 2), fmtGBP(r.interest, 2), fmtGBP(r.principal, 2), fmtGBP(r.overpayment, 2), fmtGBP(r.balance, 2)]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "mortgage-schedule.csv"; a.click();
    URL.revokeObjectURL(url);
  }, [s, loan, monthly, totalInterest, totalPaid, schedule]);

  const reset = () => { setS({ ...DEFAULTS }); setPage(0); };

  return (
    <div className="grid lg:grid-cols-[480px_1fr] gap-8 items-start">
      {/* ── Inputs panel ── */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="px-7 pt-7 pb-5 flex items-center justify-between border-b" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--foreground)" }}>Mortgage Details</h2>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 8a6 6 0 0 1 10.5-4M14 8a6 6 0 0 1-10.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 4h2V2M4 12H2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Reset
          </button>
        </div>

        <div className="p-7 space-y-6">
          {/* Property price */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Property Price</label>
            <NumField prefix="£" value={s.price} onChange={onPriceChange} min={1} max={9999999} step={1000} />
          </div>

          {/* Deposit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Deposit</label>
            <div className="grid grid-cols-2 gap-3">
              <NumField prefix="£" value={s.deposit} onChange={onDepositChange} min={0} step={1000} />
              <NumField suffix="%" value={s.depPct} onChange={onDepPctChange} min={0} max={100} step={0.5} />
            </div>
          </div>

          {/* Term */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Mortgage Term</label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{s.term} yr{s.term !== 1 ? "s" : ""}</span>
            </div>
            <input ref={termRef} type="range" min={1} max={40} step={1} value={s.term} onChange={(e) => update({ term: Number(e.target.value) })} />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}><span>1 yr</span><span>40 yrs</span></div>
          </div>

          {/* Rate */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>Interest Rate</label>
              <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{s.rate}%</span>
            </div>
            <input ref={rateRef} type="range" min={0.1} max={15} step={0.05} value={s.rate} onChange={(e) => update({ rate: Number(e.target.value) })} />
            <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--ink-40)" }}><span>0.1%</span><span>15%</span></div>
          </div>

          {/* Repayment type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Repayment Type</label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
              {(["repayment", "interest-only"] as const).map((t) => (
                <button key={t} onClick={() => update({ type: t })}
                  className="py-2.5 rounded-lg text-sm font-semibold capitalize transition-all"
                  style={{
                    background: s.type === t ? "var(--card)" : "transparent",
                    color: s.type === t ? "var(--foreground)" : "var(--ink-60)",
                    boxShadow: s.type === t ? "0 1px 6px rgba(0,0,0,0.12)" : "none",
                  }}>
                  {t === "repayment" ? "Repayment" : "Interest Only"}
                </button>
              ))}
            </div>
          </div>

          {/* Overpayment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Monthly Overpayment</label>
            <NumField prefix="£" value={s.overpay} onChange={(v) => update({ overpay: v })} min={0} step={50} />
          </div>

          {/* Start date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--ink-40)" }}>Mortgage Start Date</label>
            <input type="month" value={s.startDate} onChange={(e) => update({ startDate: e.target.value })}
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
          </div>
        </div>
      </div>

      {/* ── Results panel ── */}
      <div className="space-y-6">
        {/* Result cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <RcCard label="Monthly Payment" value={fmtGBP(monthly, 2)} sub={isIO ? "interest only" : "repayment"} featured />
          </div>
          <RcCard label="Loan Amount" value={fmtGBP(loan)} />
          <RcCard label="Total Interest" value={fmtGBP(totalInterest)} />
          <RcCard label="Total Paid" value={fmtGBP(totalPaid)} />
          <RcCard label="LTV Ratio" value={`${ltv}%`} />
          <RcCard label="End Date" value={fmtDate(endDate) ?? "—"} />
        </div>

        {/* Breakdown bar */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex justify-between text-xs font-semibold mb-3" style={{ color: "var(--ink-40)" }}>
            <span>Principal {principalPct}%</span>
            <span>Interest {100 - principalPct}%</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden flex" style={{ background: "var(--muted)" }}>
            <div className="transition-all duration-700" style={{ width: `${principalPct}%`, background: "var(--ink-40)" }} />
            <div className="transition-all duration-700 flex-1" style={{ background: "var(--foreground)" }} />
          </div>
        </div>

        {/* Overpayment impact */}
        {savings && (
          <div className="rounded-2xl p-5 border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--ink-40)" }}>Overpayment Impact</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--ink-40)" }}>Interest Saved</p>
                <p className="font-display text-xl" style={{ color: "var(--foreground)" }}>{fmtGBP(savings.interestSaved)}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--ink-40)" }}>Time Saved</p>
                <p className="font-display text-xl" style={{ color: "var(--foreground)" }}>{fmtMonths(savings.monthsSaved)}</p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--ink-40)" }}>New End Date</p>
                <p className="font-display text-xl" style={{ color: "var(--foreground)" }}>{fmtDate(savings.newEndDate) ?? "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Interest-only balloon note */}
        {isIO && (
          <div className="callout">
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>Balloon Payment</p>
            <p className="text-sm" style={{ color: "var(--ink-60)" }}>
              At the end of the term you will owe the full loan amount of <strong>{fmtGBP(loan)}</strong> as a lump sum.
            </p>
          </div>
        )}

        {/* Amortisation table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-display text-xl" style={{ color: "var(--foreground)" }}>Amortisation Schedule</h3>
            <button onClick={downloadCSV}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-opacity hover:opacity-70"
              style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 13h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              Export CSV
            </button>
          </div>

          <Tabs defaultValue="yearly" className="p-6 pt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => setPage(0)}>Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="yearly">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-[0.6875rem] font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                      <th className="text-left py-3 pr-4">Year</th>
                      <th className="text-right py-3 px-4">Payment</th>
                      <th className="text-right py-3 px-4">Interest</th>
                      <th className="text-right py-3 px-4">Principal</th>
                      <th className="text-right py-3 pl-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearly.map((r) => (
                      <tr key={r.year} className="border-t transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]" style={{ borderColor: "var(--border)" }}>
                        <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--foreground)" }}>Year {r.year}</td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--foreground)" }}>{fmtGBP(r.payment)}</td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--ink-60)" }}>{fmtGBP(r.interest)}</td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--ink-60)" }}>{fmtGBP(r.principal)}</td>
                        <td className="py-2.5 pl-4 text-right font-semibold" style={{ color: "var(--foreground)" }}>{fmtGBP(r.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-[0.6875rem] font-bold uppercase tracking-widest" style={{ color: "var(--ink-40)" }}>
                      <th className="text-left py-3 pr-4">Month</th>
                      <th className="text-right py-3 px-4">Payment</th>
                      <th className="text-right py-3 px-4">Interest</th>
                      <th className="text-right py-3 px-4">Principal</th>
                      <th className="text-right py-3 pl-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r) => (
                      <tr key={r.month} className="border-t transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]" style={{ borderColor: "var(--border)" }}>
                        <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--foreground)" }}>
                          {r.date ? fmtDate(r.date) : `Month ${r.month}`}
                        </td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--foreground)" }}>{fmtGBP(r.payment, 2)}</td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--ink-60)" }}>{fmtGBP(r.interest, 2)}</td>
                        <td className="py-2.5 px-4 text-right" style={{ color: "var(--ink-60)" }}>{fmtGBP(r.principal, 2)}</td>
                        <td className="py-2.5 pl-4 text-right font-semibold" style={{ color: "var(--foreground)" }}>{fmtGBP(r.balance, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
                  <button disabled={page === 0} onClick={() => setPage(page - 1)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-semibold disabled:opacity-30 transition-opacity hover:opacity-70"
                    style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>‹</button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = totalPages <= 7 ? i : i + Math.max(0, Math.min(page - 3, totalPages - 7));
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-semibold transition-all"
                        style={{
                          background: page === p ? "var(--foreground)" : "transparent",
                          color: page === p ? "var(--background)" : "var(--ink-60)",
                          borderColor: page === p ? "var(--foreground)" : "var(--border)",
                        }}>{p + 1}</button>
                    );
                  })}
                  <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-semibold disabled:opacity-30 transition-opacity hover:opacity-70"
                    style={{ borderColor: "var(--border)", color: "var(--ink-60)" }}>›</button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
