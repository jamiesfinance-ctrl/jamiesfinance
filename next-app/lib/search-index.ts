export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "tool" | "guide" | "page" | "deal";
  tags: string[];
};

// ── Synonym map — expands queries before Fuse sees them ───────────────────────
// Keys are what a user might type; values are terms added to the query.
// This lets "what do i actually earn" → match take-home pay, etc.
export const SYNONYM_MAP: Record<string, string[]> = {
  // Take-home pay
  "salary":          ["take home pay", "wage", "earnings", "net pay", "income tax", "PAYE"],
  "wage":            ["take home pay", "salary", "net pay"],
  "pay":             ["take home pay", "salary", "net pay"],
  "tax":             ["income tax", "take home pay", "national insurance", "NI", "PAYE"],
  "paye":            ["take home pay", "income tax", "salary", "tax"],
  "ni":              ["national insurance", "take home pay"],
  "after tax":       ["take home pay", "net pay", "salary"],
  "net":             ["take home pay", "net pay", "salary"],
  "earnings":        ["take home pay", "salary", "wage"],
  "payslip":         ["take home pay", "income tax", "national insurance"],
  "how much earn":   ["take home pay", "salary calculator"],
  "how much take home": ["take home pay calculator"],

  // Student loan
  "uni":             ["student loan", "university", "graduate", "tuition fees"],
  "university":      ["student loan", "tuition fees", "graduate"],
  "graduate":        ["student loan", "repayment", "plan 2"],
  "tuition":         ["student loan", "plan 1", "plan 2", "plan 5"],
  "student":         ["student loan", "student finance", "university"],
  "loan":            ["student loan", "repayment", "balance", "write off"],
  "debt":            ["student loan", "balance", "repayment"],
  "write off":       ["student loan", "plan 2", "30 years"],

  // Investing
  "invest":          ["investing", "index fund", "ISA", "stocks and shares", "compound interest"],
  "investing":       ["stocks and shares ISA", "index fund", "ETF", "compound interest"],
  "isa":             ["stocks and shares ISA", "investing", "ISA allowance", "tax-free"],
  "stocks":          ["investing", "stocks and shares ISA", "ETF", "index fund"],
  "shares":          ["investing", "stocks and shares ISA", "Trading 212"],
  "index fund":      ["investing", "ETF", "S&P 500", "FTSE", "vanguard"],
  "etf":             ["investing", "index fund", "stocks and shares"],
  "compound":        ["compound interest", "calculator", "investing", "growth"],
  "interest":        ["compound interest", "calculator", "savings"],
  "wealth":          ["investing", "compound interest", "ISA", "savings"],
  "retirement":      ["investing", "pension", "compound interest", "ISA"],
  "growth":          ["compound interest", "investing", "calculator"],

  // Banking / switching
  "bank":            ["bank switching", "current account", "switching bonus"],
  "switching":       ["bank switching", "switch bonus", "cash reward", "current account"],
  "switch":          ["bank switching", "switch bonus", "CASS", "current account"],
  "bonus":           ["bank switching", "switch bonus", "cash reward", "free money"],
  "free money":      ["bank switching", "switch bonus", "cash reward"],
  "current account": ["bank switching", "switch bonus", "NatWest", "Santander"],
  "natwest":         ["bank switching", "switch bonus", "no direct debit"],
  "santander":       ["bank switching", "switch bonus"],
  "lloyds":          ["bank switching", "switch bonus", "Club Lloyds"],
  "first direct":    ["bank switching", "switch bonus", "£175"],
  "direct debit":    ["bank switching", "CASS", "dummy account"],

  // Budget / spending
  "budget":          ["budget builder", "50/30/20", "spending", "needs wants savings"],
  "budgeting":       ["budget builder", "50/30/20", "monthly budget"],
  "50/30/20":        ["budget builder", "needs wants savings"],
  "spending":        ["budget builder", "budgeting", "50/30/20"],
  "money":           ["budgeting", "saving", "investing", "take home pay"],
  "saving":          ["budget builder", "savings", "emergency fund", "ISA"],
  "savings":         ["budget builder", "ISA", "savings account", "compound interest"],

  // Mortgage
  "mortgage":        ["mortgage calculator", "house", "property", "deposit"],
  "house":           ["mortgage calculator", "deposit", "property"],
  "property":        ["mortgage calculator", "house", "deposit"],
  "remortgage":      ["mortgage calculator"],

  // Credit cards
  "credit card":     ["Amex", "credit card reviews", "rewards", "Avios", "cashback"],
  "amex":            ["American Express", "British Airways", "Nectar", "Gold card"],
  "avios":           ["British Airways Amex", "Barclaycard", "flight rewards"],
  "cashback":        ["credit card", "Nectar", "TopCashback", "rewards"],
  "rewards":         ["credit card", "Avios", "Nectar", "cashback"],

  // Deals
  "deals":           ["deals hub", "offers", "bonuses", "cashback", "sign-up"],
  "offers":          ["deals hub", "bank switching", "bonuses", "cashback"],
  "free share":      ["Trading 212", "investing", "sign-up bonus"],
  "trading 212":     ["free share", "investing", "ISA", "sign-up bonus"],
  "topcashback":     ["cashback", "welcome bonus", "affiliate"],

  // Philosophy / about
  "philosophy":      ["my philosophy", "stoicism", "values", "mindset"],
  "stoic":           ["philosophy", "stoicism", "values"],
  "about":           ["about me", "Jamie", "philosophy"],

  // General
  "calculator":      ["compound interest", "take home pay", "mortgage", "student loan", "budget"],
  "tool":            ["compound interest", "take home pay", "mortgage", "student loan", "budget builder"],
  "guide":           ["bank switching", "investing", "student money"],
  "beginner":        ["start investing", "credit card", "budget builder", "student loan"],
  "help":            ["guides", "tools", "deals", "bank switching"],
  "start":           ["start investing", "budget builder", "bank switching"],
};

export const SEARCH_INDEX: SearchItem[] = [
  // ── Tools ──────────────────────────────────────────────────────
  {
    title: "Take-Home Pay Calculator",
    description: "See exactly how much you actually earn after tax. Enter your salary and student loan plan to get a full monthly and annual breakdown: income tax, National Insurance, student loan, and net pay.",
    href: "/tools/take-home-pay",
    type: "tool",
    tags: ["salary", "tax", "income tax", "national insurance", "NI", "student loan", "take home", "take-home pay", "net pay", "gross pay", "wage", "earnings", "PAYE", "payslip", "how much do i earn", "after tax", "calculator", "2025", "2026"],
  },
  {
    title: "Student Loan Repayment Simulator",
    description: "See how long your student loan will last, total amount repaid, and whether it'll be written off. Covers Plans 1, 2, 4 and 5 — including Plan 1 for Northern Ireland students.",
    href: "/tools/student-loan",
    type: "tool",
    tags: ["student loan", "plan 1", "plan 2", "plan 4", "plan 5", "northern ireland", "repayment", "write off", "balance", "graduate", "university", "tuition", "uni debt", "student finance", "how long to pay off loan"],
  },
  {
    title: "Budget Builder (50/30/20)",
    description: "Split your monthly take-home pay across needs, wants, and savings using the 50/30/20 rule. Adjust percentages and category amounts to fit your life.",
    href: "/tools/budget-builder",
    type: "tool",
    tags: ["budget", "50/30/20", "needs wants savings", "budgeting", "monthly budget", "spending", "categories", "where does my money go", "money management"],
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your savings and investments grow over time. Adjust deposit, monthly contributions, return rate, and investment period.",
    href: "/tools/compound-interest",
    type: "tool",
    tags: ["compound interest", "investing", "savings", "growth", "returns", "ISA", "calculator", "wealth", "how much will i have", "investment growth"],
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage repayments based on house price, deposit, interest rate, and term length.",
    href: "/tools/mortgage-calculator",
    type: "tool",
    tags: ["mortgage", "house", "property", "repayment", "interest", "deposit", "home buying", "first time buyer", "monthly payment"],
  },
  // ── Guides ─────────────────────────────────────────────────────
  {
    title: "Bank Switching 101",
    description: "A comprehensive guide to earning free cash by switching bank accounts in the UK. The dummy account strategy, direct debit setup, and which deals to target.",
    href: "/guides/bank-switching-101",
    type: "guide",
    tags: ["bank switching", "switching bonus", "free money", "direct debit", "CASS", "current account", "cash reward", "how to switch banks", "dummy account", "earn money switching"],
  },
  {
    title: "How I Made £3,000 from Bank Switching",
    description: "My personal story of earning over £3,000 tax-free in a year through bank switching bonuses — no direct debits needed for some of the best deals.",
    href: "/guides/my-bank-switching-story",
    type: "guide",
    tags: ["bank switching", "NatWest", "TopCashback", "free money", "student", "tax free", "personal story", "3000", "earn cash"],
  },
  {
    title: "How to Start Investing with Just £25/Month",
    description: "A beginner's guide to index funds, Stocks and Shares ISAs, and building long-term wealth in the UK starting from almost nothing.",
    href: "/guides/start-investing-25-a-month",
    type: "guide",
    tags: ["investing", "ISA", "index funds", "ETF", "S&P 500", "FTSE", "beginner investing", "stocks and shares", "compound interest", "£25", "how to invest", "start investing"],
  },
  // ── Deals / Offers ─────────────────────────────────────────────
  {
    title: "Deals & Offers Hub",
    description: "All current UK financial deals in one place — bank switching bonuses, investing sign-up offers, cashback, and credit card bonuses. Updated regularly.",
    href: "/deals",
    type: "deal",
    tags: ["deals", "offers", "bonuses", "cashback", "Trading 212", "TopCashback", "free shares", "sign-up bonus", "best deals", "money off"],
  },
  {
    title: "Bank Switching Offers",
    description: "Current UK bank switching bonuses updated regularly. Earn up to £200 for switching your current account. Standard and premier offers listed.",
    href: "/bank-switching-offers",
    type: "deal",
    tags: ["bank switching", "bonus", "Santander", "Lloyds", "Barclays", "First Direct", "NatWest", "switching offer", "cash bonus", "current account", "£175", "£200", "£180"],
  },
  // ── Reviews ────────────────────────────────────────────────────
  {
    title: "Credit Card Reviews",
    description: "Honest, scored reviews of the best credit cards in the UK — American Express, Monzo Flex, Barclaycard, Capital One, and Aqua.",
    href: "/credit-cards",
    type: "page",
    tags: ["credit card", "Amex", "American Express", "Monzo Flex", "Barclaycard", "Capital One", "Aqua", "cashback", "Avios", "Nectar", "BA", "gold card", "rewards", "best credit card uk", "credit card review"],
  },
  {
    title: "Product Reviews",
    description: "Honest reviews of financial products — credit cards, bank accounts, and more. Scored and ranked with no sponsored opinions.",
    href: "/reviews",
    type: "page",
    tags: ["reviews", "credit cards", "bank accounts", "products", "rankings", "scores", "product reviews"],
  },
  // ── Pages ──────────────────────────────────────────────────────
  {
    title: "My Philosophy",
    description: "The values and beliefs behind Jamie's Finance — on change, accessible information, stoicism, and why now is the most important time to invest.",
    href: "/philosophy",
    type: "page",
    tags: ["philosophy", "stoicism", "values", "mindset", "about", "investing mindset", "stoic", "marcus aurelius", "seneca"],
  },
  {
    title: "Digital Products",
    description: "In-depth guides and playbooks — including the Bank Switching 101 playbook.",
    href: "/products",
    type: "page",
    tags: ["products", "guides", "bank switching playbook", "download", "paid guide"],
  },
  {
    title: "All Links & Freebies",
    description: "Every link, freebie, and recommended resource in one place — tools, guides, credit cards, cashback, and social links.",
    href: "/links",
    type: "page",
    tags: ["links", "freebies", "TopCashback", "Amex", "resources", "all links", "linktree"],
  },
  {
    title: "Disclaimer",
    description: "Financial education disclaimer — FCA compliance, capital at risk warning, and what this site is and isn't.",
    href: "/disclaimer",
    type: "page",
    tags: ["disclaimer", "FCA", "legal", "financial advice", "not financial advice", "risk"],
  },
  {
    title: "Affiliate Disclosure",
    description: "How affiliate links and friend referral links work on Jamie's Finance — which relationships are active and how they're disclosed.",
    href: "/affiliate-disclosure",
    type: "page",
    tags: ["affiliate", "disclosure", "referral links", "commission", "transparency"],
  },
];

// ── "What you might like" fallback suggestions ────────────────────────────────
// Shown when a query returns zero results
export const SUGGESTED_FALLBACK: SearchItem[] = [
  SEARCH_INDEX.find((i) => i.href === "/tools/take-home-pay")!,
  SEARCH_INDEX.find((i) => i.href === "/tools/student-loan")!,
  SEARCH_INDEX.find((i) => i.href === "/deals")!,
  SEARCH_INDEX.find((i) => i.href === "/guides/bank-switching-101")!,
  SEARCH_INDEX.find((i) => i.href === "/tools/budget-builder")!,
  SEARCH_INDEX.find((i) => i.href === "/guides/start-investing-25-a-month")!,
];
