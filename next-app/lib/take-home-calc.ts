// UK Take-Home Pay Calculator — 2025/26 Tax Year
// Sources: HMRC, gov.uk/student-loan-repayment

export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5";

// ── Tax bands 2025/26 ─────────────────────────────────────────────
const PERSONAL_ALLOWANCE = 12_570;
const BASIC_RATE_LIMIT = 50_270;      // top of basic rate band
const HIGHER_RATE_LIMIT = 125_140;    // top of higher rate band / PA taper completes
const PA_TAPER_START = 100_000;       // PA reduces by £1 per £2 above this

const TAX_RATES = { basic: 0.20, higher: 0.40, additional: 0.45 };

// ── NI thresholds 2025/26 (employee Class 1, annualised) ─────────
const NI_PRIMARY_THRESHOLD = 12_570;  // £242/week × 52
const NI_UPPER_LIMIT = 50_270;
const NI_RATES = { lower: 0.00, main: 0.08, upper: 0.02 };

// ── Student loan thresholds & rates 2025/26 ──────────────────────
const STUDENT_LOAN: Record<StudentLoanPlan, { threshold: number; rate: number; writeOffYears: number; label: string }> = {
  none:  { threshold: 0,      rate: 0,    writeOffYears: 0,  label: "No student loan" },
  plan1: { threshold: 24_990, rate: 0.09, writeOffYears: 65, label: "Plan 1 (pre-2012)" },
  plan2: { threshold: 27_295, rate: 0.09, writeOffYears: 40, label: "Plan 2 (2012–2023)" },
  plan4: { threshold: 31_395, rate: 0.09, writeOffYears: 30, label: "Plan 4 (Scotland)" },
  plan5: { threshold: 25_000, rate: 0.09, writeOffYears: 40, label: "Plan 5 (from 2023)" },
};

function calcIncomeTax(gross: number): number {
  // Taper personal allowance for income over £100k
  let pa = PERSONAL_ALLOWANCE;
  if (gross > PA_TAPER_START) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - Math.floor((gross - PA_TAPER_START) / 2));
  }

  if (gross <= pa) return 0;

  const taxableIncome = gross - pa;
  const basicBandTop = BASIC_RATE_LIMIT - pa;

  let tax = 0;
  if (taxableIncome <= basicBandTop) {
    tax = taxableIncome * TAX_RATES.basic;
  } else if (taxableIncome <= HIGHER_RATE_LIMIT - pa) {
    tax = basicBandTop * TAX_RATES.basic;
    tax += (taxableIncome - basicBandTop) * TAX_RATES.higher;
  } else {
    tax = basicBandTop * TAX_RATES.basic;
    tax += (HIGHER_RATE_LIMIT - pa - basicBandTop) * TAX_RATES.higher;
    tax += (taxableIncome - (HIGHER_RATE_LIMIT - pa)) * TAX_RATES.additional;
  }

  return Math.round(tax * 100) / 100;
}

function calcNI(gross: number): number {
  if (gross <= NI_PRIMARY_THRESHOLD) return 0;
  const mainBand = Math.min(gross, NI_UPPER_LIMIT) - NI_PRIMARY_THRESHOLD;
  const upperBand = gross > NI_UPPER_LIMIT ? gross - NI_UPPER_LIMIT : 0;
  const ni = mainBand * NI_RATES.main + upperBand * NI_RATES.upper;
  return Math.round(ni * 100) / 100;
}

function calcStudentLoan(gross: number, plan: StudentLoanPlan): number {
  const { threshold, rate } = STUDENT_LOAN[plan];
  if (plan === "none" || gross <= threshold) return 0;
  return Math.round((gross - threshold) * rate * 100) / 100;
}

export type TakeHomeResult = {
  grossAnnual: number;
  incomeTaxAnnual: number;
  niAnnual: number;
  studentLoanAnnual: number;
  netAnnual: number;
  grossMonthly: number;
  incomeTaxMonthly: number;
  niMonthly: number;
  studentLoanMonthly: number;
  netMonthly: number;
  effectiveTaxRate: number;
  personalAllowance: number;
  studentLoanLabel: string;
};

export function calcTakeHome(grossAnnual: number, plan: StudentLoanPlan): TakeHomeResult {
  const incomeTaxAnnual  = calcIncomeTax(grossAnnual);
  const niAnnual         = calcNI(grossAnnual);
  const studentLoanAnnual = calcStudentLoan(grossAnnual, plan);
  const netAnnual        = grossAnnual - incomeTaxAnnual - niAnnual - studentLoanAnnual;

  const totalDeductions = incomeTaxAnnual + niAnnual + studentLoanAnnual;
  const effectiveTaxRate = grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0;

  // Taper for display
  let pa = PERSONAL_ALLOWANCE;
  if (grossAnnual > PA_TAPER_START) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - Math.floor((grossAnnual - PA_TAPER_START) / 2));
  }

  return {
    grossAnnual,
    incomeTaxAnnual,
    niAnnual,
    studentLoanAnnual,
    netAnnual,
    grossMonthly:       Math.round((grossAnnual / 12) * 100) / 100,
    incomeTaxMonthly:   Math.round((incomeTaxAnnual / 12) * 100) / 100,
    niMonthly:          Math.round((niAnnual / 12) * 100) / 100,
    studentLoanMonthly: Math.round((studentLoanAnnual / 12) * 100) / 100,
    netMonthly:         Math.round((netAnnual / 12) * 100) / 100,
    effectiveTaxRate:   Math.round(effectiveTaxRate * 10) / 10,
    personalAllowance:  pa,
    studentLoanLabel:   STUDENT_LOAN[plan].label,
  };
}

export const STUDENT_LOAN_OPTIONS: { value: StudentLoanPlan; label: string; detail: string }[] = [
  { value: "none",  label: "No student loan",    detail: "No deduction" },
  { value: "plan1", label: "Plan 1",             detail: "Pre-2012 · threshold £24,990" },
  { value: "plan2", label: "Plan 2",             detail: "2012–2023 · threshold £27,295" },
  { value: "plan4", label: "Plan 4",             detail: "Scotland · threshold £31,395" },
  { value: "plan5", label: "Plan 5",             detail: "From 2023 · threshold £25,000" },
];
