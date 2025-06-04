import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Horizendata | Enterprise Market Intelligence Platform",
  description: "Empowering businesses with comprehensive market research, statistical data, and strategic insights across industries for data-driven decision making.",
  keywords: "market research, data analytics, business intelligence, industry insights, strategic data",
  openGraph: {
    title: "Horizendata | Enterprise Market Intelligence Platform",
    description: "Empowering businesses with comprehensive market research, statistical data, and strategic insights across industries.",
    url: "https://horizendata.com",
    siteName: "Horizendata",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Horizendata | Enterprise Market Intelligence Platform",
    description: "Empowering businesses with comprehensive market research, statistical data, and strategic insights across industries.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}