import React from "react";
import css from "./Tutankhamun.module.css";
import Link from "next/link";

function TutankhamunPage() {
  return (
    <div className={css.tutankhamunPage}>
      <header>Тут шапка</header>
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
      <footer>Підвал</footer>
    </div>
  );
}

export default TutankhamunPage;
