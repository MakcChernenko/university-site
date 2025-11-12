import React from "react";
import css from "./Tutankhamun.module.css";
import Link from "next/link";
import TutanhamonFooter from "@/Components/tutanhamon/TutanhamonFooter";

export const metadata = {
  title: "Похоронний дім «Волдеморт» — Ритуальні послуги в Одесі",
  description:
    "Ми надаємо повний спектр ритуальних послуг: організація похоронів, перевезення, кремація. Одеса, Україна.",
  openGraph: {
    title: "Похоронний дім «Волдеморт» — Ритуальні послуги",
    description:
      "Ми надаємо повний спектр ритуальних послуг: організація похоронів, перевезення, кремація. Одеса, Україна.",
    url: "https://university-site-theta.vercel.app/tutanhamon",
    siteName: "Похоронний дім Волдеморт",
    images: [
      {
        url: "https://7snov.com.ua/wp-content/uploads/2020/04/do-chogo-snit-sya-neb-zhchik-v-trun-bachiti-v-dkrit-zakrit-abo-chervon-domov-ni-2.jpg",
        width: 1200,
        height: 630,
        alt: "Похоронний дім Волдеморт — ритуальні послуги",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Похоронний дім «Волдеморт» — Ритуальні послуги",
    description:
      "Ми надаємо повний спектр ритуальних послуг: організація похоронів, перевезення, кремація. Одеса, Україна.",
    images: [
      {
        url: "https://7snov.com.ua/wp-content/uploads/2020/04/do-chogo-snit-sya-neb-zhchik-v-trun-bachiti-v-dkrit-zakrit-abo-chervon-domov-ni-2.jpg",
        width: 1200,
        height: 630,
        alt: "Похоронний дім Волдеморт — ритуальні послуги",
      },
    ],
  },
};

function TutankhamunPage() {
  return (
    <div className={css.tutankhamunPage}>
      <header>Це навчальний сайт</header>
      <main>
        <section className={css.hero}>
          <div className={css.heroPresentation}>
            <h1>
              Похоронний дім &quot;Волдеморт&quot; - ритуальні послуги та
              товари.
            </h1>
            <p>
              Ми надаємо всю необхідну допомогу для організації та проведення
              похоронів і кремації в місті Одеса та в інших містах України.
              Працюємо без посередників
            </p>
            <p className={css.heroConsult}>
              Безкоштовна цілодобова консультація
            </p>
            <div className={css.heroLinkContainer}>
              <a className={css.heroLink} href="tel:0481111111">
                048 111 11 11
              </a>
              <Link className={css.heroLink} href="./tutanhamon/ourService">
                Наші послуги
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <TutanhamonFooter />
      </footer>
    </div>
  );
}

export default TutankhamunPage;
