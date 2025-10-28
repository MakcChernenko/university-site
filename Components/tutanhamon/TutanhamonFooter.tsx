import Link from "next/link";
import styles from "./TutanhamonFooter.module.css";
import { FaFacebook, FaInstagram, FaTelegramPlane } from "react-icons/fa";

export default function TutanhamonFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.title}>Похоронний дім Волдеморт</h2>
          <p className={styles.desc}>
            Навчальний проєкт. Якщо тебе ображає — йди лісом 🌲
          </p>
          <Link className={styles.link} href="/tutanhamon/questionnaire">
            Анкета
          </Link>
        </div>

        <div className={styles.middle}>
          <h3>Контакти</h3>
          <p>Кузнечна вулиця, 1, Одеса, Одеська область, 65000</p>
          <a href="tel:+380 (666) 13-13-13">Телефон: +380 (666) 13-13-13</a>
          <p>Email: dark@voldemort.ua</p>
        </div>

        <div className={styles.right}>
          <h3>Ми у мережах</h3>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              <FaTelegramPlane />
            </a>
          </div>

          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.8458625733135!2d30.7234!3d46.4825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6310025710ea3%3A0x53a64920b92023df!2s%D0%94%D0%A3%D0%86%D0%A2%D0%97!5e0!3m2!1suk!2sua!4v1698500000000!5m2!1suk!2sua"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Похоронний дім Волдеморт. Всі права захищені 🦴</p>
      </div>
    </footer>
  );
}
