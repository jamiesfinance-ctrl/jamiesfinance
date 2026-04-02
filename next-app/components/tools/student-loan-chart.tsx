"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import type { YearlySnapshot } from "@/lib/student-loan-calc";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function fmtK(n: number) {
  if (n >= 1000) return "£" + (n / 1000).toFixed(1) + "k";
  return "£" + Math.round(n);
}

interface Props {
  data: YearlySnapshot[];
  writeOffYear: number;
  paidOffYear: number | null;
}

export default function StudentLoanChart({ data, writeOffYear, paidOffYear }: Props) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const gridColor  = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const textColor  = dark ? "rgba(240,240,240,0.45)" : "rgba(20,20,20,0.40)";

  const labels   = data.map((d) => `Yr ${d.year}`);
  const balances = data.map((d) => d.balance);
  const repaid   = data.map((d) => d.cumulativeRepaid);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Remaining Balance",
        data: balances,
        fill: true,
        backgroundColor: dark ? "rgba(220,38,38,0.12)" : "rgba(220,38,38,0.08)",
        borderColor: "#dc2626",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
        yAxisID: "y",
      },
      {
        label: "Total Repaid",
        data: repaid,
        fill: false,
        borderColor: dark ? "rgba(34,197,94,0.70)" : "#16a34a",
        borderWidth: 2,
        borderDash: [5, 3],
        pointRadius: 0,
        tension: 0.35,
        yAxisID: "y",
      },
    ],
  };

  // Annotation: write-off or paid-off line
  const eventYear = paidOffYear ?? writeOffYear;

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line">) =>
            ` ${ctx.dataset.label}: £${(ctx.parsed.y ?? 0).toLocaleString("en-GB")}`,
          afterBody: (items: TooltipItem<"line">[]) => {
            const yr = data[items[0]?.dataIndex];
            if (!yr) return [];
            return yr.year === eventYear
              ? [paidOffYear ? "✓ Loan paid off" : "✦ Write-off year"]
              : [];
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 11 }, maxTicksLimit: 12 },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (v: number | string) => fmtK(Number(v)),
        },
        min: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
