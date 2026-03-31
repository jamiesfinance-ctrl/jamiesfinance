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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface CompoundChartProps {
  labels: string[];
  balances: number[];
  investeds: number[];
}

function fmtK(n: number) {
  if (n >= 1000000) return "£" + (n / 1000000).toFixed(1) + "m";
  if (n >= 1000) return "£" + (n / 1000).toFixed(0) + "k";
  return "£" + n;
}

export default function CompoundChart({ labels, balances, investeds }: CompoundChartProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const textColor = dark ? "rgba(240,240,240,0.45)" : "rgba(20,20,20,0.40)";

  const data = {
    labels,
    datasets: [
      {
        label: "Total Balance",
        data: balances,
        fill: true,
        backgroundColor: dark ? "rgba(208,208,208,0.15)" : "rgba(20,20,20,0.08)",
        borderColor: dark ? "#D0D0D0" : "#141414",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Total Invested",
        data: investeds,
        fill: true,
        backgroundColor: dark ? "rgba(208,208,208,0.06)" : "rgba(20,20,20,0.04)",
        borderColor: dark ? "rgba(208,208,208,0.40)" : "rgba(20,20,20,0.30)",
        borderWidth: 1.5,
        borderDash: [4, 3],
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            ` ${ctx.dataset.label}: £${(ctx.parsed.y ?? 0).toLocaleString("en-GB")}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 11 }, maxTicksLimit: 10 },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (v: number | string) => fmtK(Number(v)),
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
