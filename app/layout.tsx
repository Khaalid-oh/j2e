import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const dmMono = localFont({
  src: "../public/fonts/dm-mono-latin.woff2",
  variable: "--font-dm-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Journey to Excellence | Anglophone East",
    template: "%s | Journey to Excellence",
  },
  description:
    "Professional learning for the people who shape the future. Learn, connect and grow with Anglophone East School District in Moncton, New Brunswick.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} antialiased`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
