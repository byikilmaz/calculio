import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdSenseScript } from "@/components/layout/AdSenseScript";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calculio.net"),
  title: {
    default: "Calculio — Simulateurs Financiers Gratuits",
    template: "%s | Calculio",
  },
  description:
    "Simulateurs fiscaux et financiers gratuits pour la France, la Belgique, la Suisse et le Canada. Barèmes officiels 2026.",
  openGraph: {
    siteName: "Calculio",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AdSenseScript />
      </body>
    </html>
  );
}
