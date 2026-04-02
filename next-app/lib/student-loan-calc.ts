// Student Loan Repayment Simulator — 2025/26
// Repayment threshold & rate data: gov.uk/repaying-your-student-loan

export type LoanPlan = "plan1" | "plan2" | "plan4" | "plan5";

export const PLAN_INFO: Record<LoanPlan, {
  label: string;
  threshold: number;
  rate: number;         // repayment rate (9% for all current plans)
  interestRate: number; // approximate 2025 rate
  writeOffYears: number;
  writeOffNote: string;
}> = {
  plan1: {
    label: "Plan 1 (pre-2012)",
    threshold: 24_990,
    rate: 0.09,
    interestRate: 0.043, // ~RPI 2025
    writeOffYears: 25,   // 25 years after first repayment April, or age 65
    writeOffNote: "Written off 25 years after first repayment April (or age 65)",
  },
  plan2: {
    label: "Plan 2 (2012–2023)",
    threshold: 27_295,
    rate: 0.09,
    interestRate: 0.073, // RPI + 3% (2025 cap)
    writeOffYears: 30,   // 30 years after April following graduation
    writeOffNote: "Written off 30 years after April following graduation",
  },
  plan4: {
    label: "Plan 4 (Scotland)",
    threshold: 31_395,
    rate: 0.09,
    interestRate: 0.043, // ~RPI 2025
    writeOffYears: 30,
    writeOffNote: "Written off 30 years after April following first repayment",
  },
  plan5: {
    label: "Plan 5 (from 2023)",
    threshold: 25_000,
    rate: 0.09,
    interestRate: 0.073, // RPI + 3%
    writeOffYears: 40,
    writeOffNote: "Written off 40 years after April following graduation",
  },
};

export type YearlySnapshot = {
  year: number;
  balance: number;
  annualRepayment: number;
  annualInterest: number;
  salary: number;
  cumulativeRepaid: number;
};

export type SimResult = {
  yearlyData: YearlySnapshot[];
  paidOffYear: number | null;    // null = written off
  writeOffYear: number;
  totalRepaid: number;
  totalInterestPaid: number;
  writtenOffAmount: number;      // balance remaining at write-off (0 if paid off first)
  monthlyRepaymentNow: number;
  plan: LoanPlan;
};

export function simulateStudentLoan(
  balance: number,
  salary: number,
  salaryGrowthPct: number,
  plan: LoanPlan,
  yearsFromGraduation: number = 0
): SimResult {
  const info = PLAN_INFO[plan];
  const yearsRemaining = info.writeOffYears - yearsFromGraduation;

  let currentBalance = balance;
  let currentSalary = salary;
  let cumulativeRepaid = 0;
  let cumulativeInterest = 0;
  let paidOffYear: number | null = null;

  const yearlyData: YearlySnapshot[] = [];

  // Year 0 snapshot
  yearlyData.push({
    year: 0,
    balance: Math.round(balance),
    annualRepayment: 0,
    annualInterest: 0,
    salary: Math.round(salary),
    cumulativeRepaid: 0,
  });

  for (let yr = 1; yr <= yearsRemaining; yr++) {
    if (currentBalance <= 0) {
      // Already paid off — pad remaining years with zeros
      yearlyData.push({
        year: yr,
        balance: 0,
        annualRepayment: 0,
        annualInterest: 0,
        salary: Math.round(currentSalary),
        cumulativeRepaid: Math.round(cumulativeRepaid),
      });
      continue;
    }

    // Annual interest
    const interest = currentBalance * info.interestRate;
    currentBalance += interest;
    cumulativeInterest += interest;

    // Annual repayment
    const annualRepayment = Math.max(0, (currentSalary - info.threshold) * info.rate);
    const actualRepayment = Math.min(annualRepayment, currentBalance);
    currentBalance -= actualRepayment;
    cumulativeRepaid += actualRepayment;

    if (currentBalance <= 0 && paidOffYear === null) {
      paidOffYear = yr;
      currentBalance = 0;
    }

    yearlyData.push({
      year: yr,
      balance: Math.round(Math.max(0, currentBalance)),
      annualRepayment: Math.round(actualRepayment),
      annualInterest: Math.round(interest),
      salary: Math.round(currentSalary),
      cumulativeRepaid: Math.round(cumulativeRepaid),
    });

    // Grow salary for next year
    currentSalary *= 1 + salaryGrowthPct / 100;
  }

  const writtenOffAmount = paidOffYear === null ? Math.max(0, currentBalance) : 0;

  // Monthly repayment at current salary
  const monthlyRepaymentNow = salary > info.threshold
    ? Math.round(((salary - info.threshold) * info.rate) / 12)
    : 0;

  return {
    yearlyData,
    paidOffYear,
    writeOffYear: yearsRemaining,
    totalRepaid: Math.round(cumulativeRepaid),
    totalInterestPaid: Math.round(cumulativeInterest),
    writtenOffAmount: Math.round(writtenOffAmount),
    monthlyRepaymentNow,
    plan,
  };
}
