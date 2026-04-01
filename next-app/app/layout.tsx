import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ForceDarkOnHome } from "@/components/home/force-dark-on-home";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jamie's Finance — Your Guide to Smarter Money Choices",
  description:
    "Practical guides on budgeting, investing, banking, and saving money — built for everyday people in the UK.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerifDisplay.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="overflow-x-hidden antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="jf-theme"
          enableSystem={false}
        >
          <ForceDarkOnHome />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
