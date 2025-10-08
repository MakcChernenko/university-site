"use client";
import Link from "next/link";
import css from "./page.module.css";

function Page() {
  return (
    <main>
      <Link className={css.link} href="/slider">
        Predmets
      </Link>
      <Link className={css.link} href="/dnd">
        DND
      </Link>
      <Link className={css.link} href="/calculate">
        Calculate
      </Link>
      <Link className={css.link} href="/exorcism">
        ГейАндрій
      </Link>
      <Link className={css.link} href="/drawGraf">
        Редакторграфів
      </Link>
      <Link className={css.link} href="/tutanhamon">
        Гроби
      </Link>
    </main>
  );
}

export default Page;
