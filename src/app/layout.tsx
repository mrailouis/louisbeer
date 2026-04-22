import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://louisbeer.net"),
  title: {
    default: "Louis Beer — PPE & Systems Engineering",
    template: "%s · Louis Beer",
  },
  description:
    "Louis Beer is a PPE student at the University of Southampton working at the intersection of political economy, geopolitical analysis, and systems-level software engineering.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://louisbeer.net",
    siteName: "Louis Beer",
    title: "Louis Beer — PPE & Systems Engineering",
    description:
      "PPE student at the University of Southampton. Political economy, geopolitical analysis, and systems engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Beer",
    description: "PPE student. Political economy, geopolitics, systems engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "your-token-here"}'
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-stone-200 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-200">
        <ThemeProvider>
          <Nav />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
