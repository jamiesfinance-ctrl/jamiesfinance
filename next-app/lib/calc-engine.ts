// ── Pure calculation functions — no DOM access ───────────────────────────────

export interface AmortRow {
  month: number;
  date: Date | null;
  payment: number;
  interest: number;
  principal: number;
  overpayment: number;
  balance: number;
}

export interface YearlySummary {
  year: number;
  months: number;
  payment: number;
  interest: number;
  principal: number;
  overpayment: number;
  balance: number;
  endDate: Date | null;
}

export interface OverpaymentSavings {
  interestSaved: number;
  monthsSaved: number;
  newEndDate: Date | null;
  newMonths: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export const CalcEngine = {
  /**
   * Standard amortising loan formula (repayment mortgage):
   *   M = P × r(1+r)^n / ((1+r)^n − 1)
   */
  monthlyRepayment(P: number, annualRate: number, years: number): number {
    if (P <= 0 || annualRate <= 0 || years <= 0) return 0;
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  },

  /**
   * Interest-only mortgage: borrower pays only monthly interest.
   *   M = P × r
   */
  monthlyInterestOnly(P: number, annualRate: number): number {
    if (P <= 0 || annualRate <= 0) return 0;
    const r = annualRate / 100 / 12;
    return P * r;
  },

  /**
   * Build full month-by-month amortisation schedule.
   */
  buildSchedule(
    P: number,
    annualRate: number,
    years: number,
    monthlyPayment: number,
    overpayment: number,
    isInterestOnly: boolean,
    startDate: string
  ): AmortRow[] {
    const r = annualRate / 100 / 12;
    const maxMonths = years * 12;
    const schedule: AmortRow[] = [];
    let balance = P;
    let currentDate: Date | null = startDate ? new Date(startDate) : null;
    if (currentDate) currentDate.setDate(1);

    for (let month = 1; month <= maxMonths; month++) {
      if (balance < 0.005) break;

      const interestCharge = balance * r;
      let principal: number, payment: number, extra: number;

      if (isInterestOnly) {
        extra = Math.min(overpayment, balance);
        principal = extra;
        payment = interestCharge + extra;
      } else {
        const scheduledPrincipal = monthlyPayment - interestCharge;
        extra = Math.min(overpayment, Math.max(0, balance - scheduledPrincipal));
        principal = Math.min(scheduledPrincipal + extra, balance);
        payment = interestCharge + principal;
      }

      balance = Math.max(0, balance - principal);

      let rowDate: Date | null = null;
      if (currentDate) {
        currentDate.setMonth(currentDate.getMonth() + 1);
        rowDate = new Date(currentDate);
      }

      schedule.push({
        month,
        date: rowDate,
        payment: round2(payment),
        interest: round2(interestCharge),
        principal: round2(principal),
        overpayment: round2(extra),
        balance: round2(balance),
      });
    }
    return schedule;
  },

  /**
   * Summarise monthly schedule into one row per calendar year.
   */
  summariseByYear(schedule: AmortRow[]): YearlySummary[] {
    const map: Record<number, YearlySummary> = {};
    schedule.forEach((row) => {
      const yr = Math.ceil(row.month / 12);
      if (!map[yr]) {
        map[yr] = { year: yr, months: 0, payment: 0, interest: 0, principal: 0, overpayment: 0, balance: 0, endDate: null };
      }
      map[yr].months += 1;
      map[yr].payment += row.payment;
      map[yr].interest += row.interest;
      map[yr].principal += row.principal;
      map[yr].overpayment += row.overpayment;
      map[yr].balance = row.balance;
      map[yr].endDate = row.date;
    });
    return Object.values(map).map((r) => ({
      ...r,
      payment: round2(r.payment),
      interest: round2(r.interest),
      principal: round2(r.principal),
      overpayment: round2(r.overpayment),
    }));
  },

  /**
   * Compare baseline vs overpayment schedule to calculate savings.
   */
  overpaymentSavings(
    P: number,
    annualRate: number,
    years: number,
    monthlyPayment: number,
    overpayment: number,
    isInterestOnly: boolean,
    startDate: string
  ): OverpaymentSavings {
    const base = this.buildSchedule(P, annualRate, years, monthlyPayment, 0, isInterestOnly, startDate);
    const over = this.buildSchedule(P, annualRate, years, monthlyPayment, overpayment, isInterestOnly, startDate);
    const baseInterest = base.reduce((s, r) => s + r.interest, 0);
    const overInterest = over.reduce((s, r) => s + r.interest, 0);
    return {
      interestSaved: round2(baseInterest - overInterest),
      monthsSaved: base.length - over.length,
      newEndDate: over.length > 0 ? over[over.length - 1].date : null,
      newMonths: over.length,
    };
  },
};

// ── Formatting helpers ────────────────────────────────────────────────────────

export function fmtGBP(n: number, decimals = 0): string {
  if (isNaN(n) || n === null) return "—";
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtDate(d: Date | null): string | null {
  if (!d) return null;
  return d.toLocaleString("en-GB", { month: "short", year: "numeric" });
}

export function fmtMonths(m: number): string {
  if (m <= 0) return "0 months";
  const yrs = Math.floor(m / 12);
  const mos = m % 12;
  const parts: string[] = [];
  if (yrs > 0) parts.push(yrs + " yr" + (yrs > 1 ? "s" : ""));
  if (mos > 0) parts.push(mos + " mo" + (mos > 1 ? "s" : ""));
  return parts.join(" ");
}
