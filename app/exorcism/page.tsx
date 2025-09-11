import Header from "@/Components/Exorcism/Header/Header";
import Footer from "@/Components/Exorcism/Footer/Footer";
import CatalogSection from "@/Components/Exorcism/CatalogSection/CatalogSection";
import Link from "next/link";
import styles from "@/app/exorcism/GlobalExorcism.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CatalogSection />
        <div className={styles.section}>
          <h3>🧙‍♂️ Шаман Чепелюк</h3>
          <p>
            Досвід роботи: 25 років у магічній сфері, включаючи вигнання чортів
            зі свиней, зняття пристріту з маршруток, та лікування телевізорів
            від прокляття.
          </p>
          <p>
            Його головне досягнення: виграв у карти у самого домовика та продав
            душу двічі, отримавши кешбек.
          </p>
          <Link className={styles.link} href="/exorcism/about">
            Детальніше про шамана
          </Link>
        </div>
        <div className={styles.section}>
          <p>Одні кажуть, що Чепелюк – геній, інші – що шахрай...</p>
          <Link className={styles.link} href="/exorcism/about">
            Читати всі відгуки
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
