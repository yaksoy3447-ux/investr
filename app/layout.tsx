import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Investr — Türkiye'nin İlk Yatırımcı Erişim Platformu",
  description:
    "1000+ Türk melek yatırımcı ve VC'ye doğrudan erişim. Platform üzerinden email at, yanıtları takip et.",
  keywords: [
    "yatırımcı",
    "melek yatırımcı",
    "VC",
    "startup",
    "girişim sermayesi",
    "Türkiye",
    "fon bulma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
