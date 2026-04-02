export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "tool" | "guide" | "page" | "deal";
  tags: string[];
};

export const SEARCH_INDEX: SearchItem[] = [
  // ── Tools ──────────────────────────────────────────────────────
  {
    title: "Take-Home Pay Calculator",
    description: "See exactly how much you actually earn. Enter your salary and student loan plan to get a full monthly and annual breakdown: income tax, National Insurance, student loan, and net pay.",
    href: "/tools/take-home-pay",
    type: "tool",
    tags: ["salary", "tax", "income tax", "national insurance", "NI", "student loan", "take home", "pay", "wages", "PAYE", "net pay", "gross pay"],
  },
  {
    title: "Student Loan Repayment Simulator",
    description: "See how long your student loan will last, total amount repaid, and whether it'll be written off before you pay it off. Supports Plans 1, 2, 4 and 5.",
    href: "/tools/student-loan",
    type: "tool",
    tags: ["student loan", "plan 1", "plan 2", "plan 4", "plan 5", "repayment", "write off", "balance", "graduate", "university", "tuition"],
  },
  {
    title: "Budget Builder (50/30/20)",
    description: "Split your monthly take-home pay across needs, wants, and savings using the 50/30/20 rule. Adjust percentages and category amounts.",
    href: "/tools/budget-builder",
    type: "tool",
    tags: ["budget", "50/30/20", "needs wants savings", "budgeting", "monthly budget", "spending", "categories"],
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your savings and investments grow over time with compound interest. Adjust deposit, monthly contributions, return rate, and investment period.",
    href: "/tools/compound-interest",
    type: "tool",
    tags: ["compound interest", "investing", "savings", "growth", "returns", "ISA", "calculator", "wealth"],
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage repayments based on house price, deposit, interest rate, and term length.",
    href: "/tools/mortgage-calculator",
    type: "tool",
    tags: ["mortgage", "house", "property", "repayment", "interest", "deposit", "home buying"],
  },
  // ── Guides ─────────────────────────────────────────────────────
  {
    title: "Bank Switching 101",
    description: "A comprehensive guide to earning free cash by switching bank accounts in the UK. Learn the dummy account strategy, how to set up direct debits, and which deals to target.",
    href: "/guides/bank-switching-101",
    type: "guide",
    tags: ["bank switching", "switching bonus", "free money", "direct debit", "CASS", "current account", "cash reward"],
  },
  {
    title: "How I Made £3,000 from Bank Switching",
    description: "My personal story of earning over £3,000 in a year through bank switching bonuses and student offers — tax-free, zero skill required.",
    href: "/guides/my-bank-switching-story",
    type: "guide",
    tags: ["bank switching", "NatWest", "TopCashback", "free money", "student", "tax free", "personal story"],
  },
  {
    title: "How to Start Investing with Just £25/Month",
    description: "A beginner's guide to index funds, Stocks and Shares ISAs, and building long-term wealth in the UK starting from almost nothing.",
    href: "/guides/start-investing-25-a-month",
    type: "guide",
    tags: ["investing", "ISA", "index funds", "ETF", "S&P 500", "FTSE", "beginner", "stocks and shares", "compound interest", "£25"],
  },
  // ── Deals / Offers ─────────────────────────────────────────────
  {
    title: "Deals & Offers Hub",
    description: "All current UK financial deals in one place — bank switching bonuses, investing sign-up offers, cashback, and credit card bonuses. Updated regularly.",
    href: "/deals",
    type: "deal",
    tags: ["deals", "offers", "bonuses", "cashback", "Trading 212", "TopCashback", "free shares", "sign-up bonus"],
  },
  {
    title: "Bank Switching Offers",
    description: "Current UK bank switching bonuses — updated regularly. Earn up to £200 for switching your current account. Standard and premier offers listed.",
    href: "/bank-switching-offers",
    type: "deal",
    tags: ["bank switching", "bonus", "Santander", "Lloyds", "Barclays", "First Direct", "NatWest", "switching offer", "cash bonus", "current account"],
  },
  // ── Reviews ────────────────────────────────────────────────────
  {
    title: "Credit Card Reviews",
    description: "Honest, scored reviews of the best credit cards in the UK — American Express, Monzo Flex, Barclaycard, Capital One, and Aqua. Find the right card for you.",
    href: "/credit-cards",
    type: "page",
    tags: ["credit card", "Amex", "American Express", "Monzo Flex", "Barclaycard", "Capital One", "Aqua", "cashback", "Avios", "Nectar", "BA", "gold card", "rewards"],
  },
  {
    title: "Product Reviews",
    description: "Honest reviews of financial products — credit cards, bank accounts, and more. Scored and ranked with no sponsored opinions.",
    href: "/reviews",
    type: "page",
    tags: ["reviews", "credit cards", "bank accounts", "products", "rankings", "scores"],
  },
  // ── Pages ──────────────────────────────────────────────────────
  {
    title: "My Philosophy",
    description: "The values and beliefs behind Jamie's Finance — on change, accessible information, stoicism, and why now is the most important time to invest.",
    href: "/philosophy",
    type: "page",
    tags: ["philosophy", "stoicism", "values", "mindset", "about", "investing mindset"],
  },
  {
    title: "Digital Products",
    description: "In-depth guides and playbooks — including the Bank Switching 101 playbook.",
    href: "/products",
    type: "page",
    tags: ["products", "guides", "bank switching playbook", "download", "ebook"],
  },
  {
    title: "All Links & Freebies",
    description: "Every link, freebie, and recommended resource in one place — tools, guides, credit cards, cashback, and social links.",
    href: "/links",
    type: "page",
    tags: ["links", "freebies", "TopCashback", "Amex", "resources", "all links"],
  },
];
