"use client";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Зв'язатися з шаманом</h2>
        <form
          action="https://formsubmit.co/makcvoin09@gmail.com"
          method="POST"
          className={styles.form}
        >
          <label>
            Ім'я
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Повідомлення
            <textarea name="message" rows={4} required></textarea>
          </label>
          <button type="submit">Відправити</button>
          <button type="button" onClick={onClose} className={styles.close}>
            ❌ Закрити
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
