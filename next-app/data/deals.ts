// ── Deals data ────────────────────────────────────────────────────────────────
// Update this file to add, edit, or remove deals. No code changes needed.
// Set `active: false` to hide a deal without deleting it.

export type Deal = {
  id: string;
  category: "bank-switching" | "investing" | "cashback" | "credit-card" | "savings";
  title: string;
  provider: string;
  summary: string;
  value: string;           // e.g. "Up to £175" or "Free shares"
  cta: string;             // button label
  href: string;
  affiliate: boolean;      // true = affiliate/referral link
  affiliateNote?: string;  // short note shown next to button
  expiry?: string;         // ISO date string or "Ongoing"
  badge?: string;          // e.g. "Top Pick", "Limited", "New"
  badgeColor?: string;
  active: boolean;
};

export const DEALS: Deal[] = [
  // ── Bank Switching ──────────────────────────────────────────────
  {
    id: "first-direct-switch",
    category: "bank-switching",
    title: "First Direct — £175 Switch Bonus",
    provider: "First Direct",
    summary: "Switch your current account to First Direct using CASS. Pay in £1,000/month, set up 2 direct debits, and get £175 in your account within 28 days.",
    value: "£175 cash",
    cta: "View offer",
    href: "/bank-switching-offers",
    affiliate: false,
    expiry: "Ongoing",
    badge: "Top Pick",
    badgeColor: "#16a34a",
    active: true,
  },
  {
    id: "santander-switch",
    category: "bank-switching",
    title: "Santander — £180 Switch Bonus",
    provider: "Santander",
    summary: "Switch to a Santander Everyday or Edge current account. Pay in £1,500/month, set up 2 direct debits.",
    value: "£180 cash",
    cta: "View offer",
    href: "/bank-switching-offers",
    affiliate: false,
    expiry: "Ongoing",
    active: true,
  },
  {
    id: "natwest-switch",
    category: "bank-switching",
    title: "NatWest — £150 Switch Bonus",
    provider: "NatWest",
    summary: "No direct debits required. Pay in £1,250 and log in to mobile banking. One of the easiest switches available.",
    value: "£150 cash",
    cta: "View offer",
    href: "/bank-switching-offers",
    affiliate: false,
    expiry: "Ongoing",
    badge: "No Direct Debits",
    badgeColor: "#2563eb",
    active: true,
  },
  {
    id: "lloyds-switch",
    category: "bank-switching",
    title: "Club Lloyds — £200 Switch Bonus",
    provider: "Lloyds Bank",
    summary: "Switch to Club Lloyds current account. Pay in £1,500/month, set up 3 direct debits. £3/month fee waived if you pay in £2,000+.",
    value: "£200 cash",
    cta: "View offer",
    href: "/bank-switching-offers",
    affiliate: false,
    expiry: "Ongoing",
    active: true,
  },
  // ── Investing ───────────────────────────────────────────────────
  {
    id: "trading212",
    category: "investing",
    title: "Trading 212 — Free Share on Sign-Up",
    provider: "Trading 212",
    summary: "Open a Trading 212 Stocks & Shares ISA or invest account using my code and get a free share worth up to £100. Commission-free investing, 0% platform fee on ISA.",
    value: "Free share (up to £100)",
    cta: "Get free share",
    href: "https://trading212.com/join/jamie",
    affiliate: true,
    affiliateNote: "Use code JAMIE · Affiliate link",
    expiry: "Ongoing",
    badge: "Affiliate",
    badgeColor: "#7c3aed",
    active: true,
  },
  // ── Cashback ────────────────────────────────────────────────────
  {
    id: "topcashback",
    category: "cashback",
    title: "TopCashback — £10–£20 Welcome Bonus",
    provider: "TopCashback",
    summary: "Sign up to TopCashback using my referral link and earn £10–£20 on your first cashback purchase. Then stack it with bank switching offers for extra earnings.",
    value: "£10–£20 bonus",
    cta: "Join TopCashback",
    href: "https://www.topcashback.co.uk/ref/jamieschmidt1/",
    affiliate: true,
    affiliateNote: "Referral link",
    expiry: "Ongoing",
    badge: "Top Pick",
    badgeColor: "#16a34a",
    active: true,
  },
  // ── Credit Cards ────────────────────────────────────────────────
  {
    id: "amex-ba",
    category: "credit-card",
    title: "British Airways Amex — Bonus Avios",
    provider: "American Express",
    summary: "Apply for the BA Amex using my friend referral link and receive bonus Avios on sign-up. The best free credit card in the UK — earn Avios on every purchase.",
    value: "Bonus Avios on sign-up",
    cta: "Apply via referral",
    href: "https://americanexpress.com/en-gb/referral/ba-classic-credit?ref=jAMESShSvU&XL=MIMNS",
    affiliate: true,
    affiliateNote: "Friend referral link",
    expiry: "Ongoing",
    active: true,
  },
  {
    id: "amex-nectar",
    category: "credit-card",
    title: "Nectar Amex — Bonus Nectar Points",
    provider: "American Express",
    summary: "Apply for the Nectar Amex via my friend link and get bonus Nectar points on sign-up. Best card for Sainsbury's shoppers and everyday spending.",
    value: "Bonus Nectar points",
    cta: "Apply via referral",
    href: "https://americanexpress.com/en-gb/referral/nectar-credit?ref=jAMESSjN3G&XLINK=MYCP",
    affiliate: true,
    affiliateNote: "Friend referral link",
    expiry: "Ongoing",
    active: true,
  },
];

export const CATEGORIES: { value: Deal["category"] | "all"; label: string }[] = [
  { value: "all",          label: "All Deals" },
  { value: "bank-switching", label: "Bank Switching" },
  { value: "investing",    label: "Investing" },
  { value: "cashback",     label: "Cashback" },
  { value: "credit-card",  label: "Credit Cards" },
  { value: "savings",      label: "Savings" },
];
