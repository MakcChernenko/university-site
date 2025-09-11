import Link from "next/link";
import styles from "./CatalogSection.module.css";

export default function CatalogSection() {
  return (
    <section className={styles.catalog}>
      <h2>🛒 Каталог магічних послуг</h2>
      <ul>
        <li>
          Зняття порчі – 999₴ (Шанс успіху: 90%) | Побічка: постійна ікота{" "}
          <Link href="/catalog">Замовити</Link>
        </li>
        <li>
          Накладення порчі – 1499₴ (Шанс: 80%) | Побічка: відкат по кармі{" "}
          <Link href="/catalog">Замовити</Link>
        </li>
        <li>
          Лікування імпотенції – 1999₴ (Шанс: 30%) | Побічка: виростає хвіст{" "}
          <Link href="/catalog">Замовити</Link>
        </li>
        <li>
          Гадання на картах Таро – 499₴ (Шанс: 70%) | Побічка: залежність від
          карт <Link href="/catalog">Замовити</Link>
        </li>
        <li>
          Екзорцизм – 2999₴ (Шанс: 40%) | Побічка: демон починає дзвонити{" "}
          <Link href="/catalog">Замовити</Link>
        </li>
        <li>
          💀 Виклик духа покійного діда – 799₴ (Шанс: 50%) | Побічка: дід буде
          жити у вашому холодильнику <Link href="/catalog">Замовити</Link>
        </li>
      </ul>
    </section>
  );
}
