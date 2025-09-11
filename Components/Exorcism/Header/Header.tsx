import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>🔮 Магічний магазин шамана Чепелюка 🔮</h1>
      <nav>
        <ul>
          <li>
            <Link href="/exorcism/catalog">Каталог</Link>
          </li>
          <li>
            <Link href="/exorcism/about">Про шамана</Link>
          </li>
          <li>
            <Link href="/exorcism/reviewsSection">Відгуки</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
