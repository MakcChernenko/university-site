import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Похоронний дім «Волдеморт» — Ритуальні послуги в Одесі",
  description:
    "Похоронний дім «Волдеморт» пропонує повний спектр ритуальних послуг у місті Одеса та по всій Україні. 24/7 консультації без посередників.",
  keywords: [
    "похоронні послуги Одеса",
    "ритуальний дім",
    "організація похорону",
    "кремація Одеса",
    "похоронний дім Волдеморт",
  ],
  openGraph: {
    title: "Похоронний дім «Волдеморт» — Ритуальні послуги",
    description:
      "Ми надаємо повний спектр ритуальних послуг: організація похоронів, перевезення, кремація. Одеса, Україна.",
    url: "https://university-site-theta.vercel.app/tutanhamon",
    siteName: "Похоронний дім Волдеморт",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "https://7snov.com.ua/wp-content/uploads/2020/04/do-chogo-snit-sya-neb-zhchik-v-trun-bachiti-v-dkrit-zakrit-abo-chervon-domov-ni-2.jpg",
        width: 1200,
        height: 630,
        alt: "Похоронний дім Волдеморт — ритуальні послуги",
      },
    ],
  },
  alternates: {
    canonical: "https://university-site-theta.vercel.app/tutanhamon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
