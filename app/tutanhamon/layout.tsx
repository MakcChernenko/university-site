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
        url: "https://masterpiecer-images.s3.yandex.net/be11528275c311ee8dccf6c574779d3e:upscaled",
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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
