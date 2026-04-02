import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — Jamie's Finance",
  description: "Important information about the nature of content on Jamie's Finance — financial education, not financial advice.",
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-widest border"
              style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-60)", borderColor: "var(--border)" }}>
              Legal
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-none mb-6" style={{ color: "var(--foreground)" }}>
            Disclaimer
          </h1>
          <p className="text-lg prose-body">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: "var(--background)" }}>
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Financial Education, Not Advice */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              Financial Education, Not Financial Advice
            </h2>
            <div className="space-y-4 text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              <p>
                All content published on Jamie&apos;s Finance — including guides, articles, tools, videos, social media posts, and product reviews — is intended solely for <strong style={{ color: "var(--foreground)" }}>general educational and informational purposes</strong>. It does not constitute, and should not be construed as, financial advice, investment advice, tax advice, or any other form of regulated financial guidance.
              </p>
              <p>
                Jamie&apos;s Finance is not authorised or regulated by the <strong style={{ color: "var(--foreground)" }}>Financial Conduct Authority (FCA)</strong>. The content on this website does not represent a personal recommendation to buy, sell, hold, or otherwise act on any financial product or investment. Nothing here takes into account your individual financial circumstances, objectives, or risk tolerance.
              </p>
              <p>
                If you require personalised financial advice, you should consult a qualified, FCA-authorised financial adviser who can assess your specific situation.
              </p>
            </div>
          </div>

          {/* FCA Compliance */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              FCA Regulatory Compliance
            </h2>
            <div className="space-y-4 text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              <p>
                Jamie&apos;s Finance operates as a financial education platform and <strong style={{ color: "var(--foreground)" }}>does not carry out regulated activities</strong> as defined under the Financial Services and Markets Act 2000 (FSMA). In particular, this website does not:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  "Accept or manage client money or investments",
                  "Execute financial transactions on behalf of users",
                  "Provide personalised financial planning or portfolio management",
                  "Issue, sell, or promote specific financial instruments in a way that constitutes a financial promotion under FSMA s.21",
                  "Act as a credit broker, insurance intermediary, or mortgage adviser",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="flex-shrink-0 mt-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5 6.5-7" stroke="var(--foreground)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Where this website discusses specific financial products (such as bank accounts or credit cards), this is done in the context of <strong style={{ color: "var(--foreground)" }}>comparative educational content</strong>, not as a regulated financial promotion or personal recommendation. Product terms, rates, and availability change frequently — always verify directly with the provider before making any decision.
              </p>
              <p>
                If you believe any content on this website raises a compliance concern, please contact us at <a href="mailto:jamie@jamiesfinance.uk" className="underline" style={{ color: "var(--foreground)" }}>jamie@jamiesfinance.uk</a>.
              </p>
            </div>
          </div>

          {/* Capital at Risk */}
          <div className="rounded-2xl p-6 border" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
            <h2 className="font-display text-xl mb-3" style={{ color: "#9a3412" }}>
              Capital at Risk Warning
            </h2>
            <p className="text-sm" style={{ color: "#7c2d12", lineHeight: 1.85 }}>
              When investing, <strong>your capital is at risk</strong>. The value of investments can go down as well as up, and you may get back less than you invest. Past performance is not a reliable indicator of future results. Tax treatment depends on individual circumstances and may be subject to change. This warning applies to all investment-related content on this website, including content about stocks and shares ISAs, index funds, and any other investment vehicles discussed.
            </p>
          </div>

          {/* Accuracy */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              Accuracy and Currency of Information
            </h2>
            <div className="space-y-4 text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              <p>
                We make reasonable efforts to ensure that the information on this website is accurate and up to date at the time of publication. However, financial products, interest rates, switching bonuses, and regulatory requirements change frequently. We cannot guarantee that all information remains current, and we accept no liability for decisions made based on outdated content.
              </p>
              <p>
                Always check the provider&apos;s official website or contact them directly for the most current terms, rates, and eligibility criteria before making any financial decision.
              </p>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              Tools and Calculators
            </h2>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              The calculators and tools on this website (including the compound interest calculator) are provided for <strong style={{ color: "var(--foreground)" }}>illustrative purposes only</strong>. They use simplified models and assumptions that may not reflect your real-world circumstances. Results should not be used as the basis for any financial decision without independent verification.
            </p>
          </div>

          {/* External links */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              External Links
            </h2>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              This website contains links to third-party websites. These links are provided for convenience and informational purposes. Jamie&apos;s Finance has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them. The inclusion of a link does not imply endorsement of that website or its content. See our{" "}
              <Link href="/affiliate-disclosure" className="underline" style={{ color: "var(--foreground)" }}>affiliate disclosure</Link>{" "}
              for information about links that may result in a commission or reward.
            </p>
          </div>

          {/* Limitation of liability */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5" style={{ color: "var(--foreground)" }}>
              Limitation of Liability
            </h2>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.85 }}>
              To the fullest extent permitted by law, Jamie&apos;s Finance and its owner accept no liability for any direct, indirect, incidental, or consequential loss or damage arising from your use of this website or reliance on any content published here. This includes, but is not limited to, financial loss, loss of income, or investment losses.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-2xl p-6 border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
            <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>Questions about this disclaimer?</p>
            <p className="text-sm" style={{ color: "var(--ink-60)", lineHeight: 1.7 }}>
              If you have any questions about this disclaimer or the content on this website, please contact:{" "}
              <a href="mailto:jamie@jamiesfinance.uk" className="font-semibold underline" style={{ color: "var(--foreground)" }}>jamie@jamiesfinance.uk</a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
