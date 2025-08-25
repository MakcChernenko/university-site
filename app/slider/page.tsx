"use client";
import { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import Modal from "./Modal";
import { fetchGitHab } from "@/api/api";
import { Materials } from "@/type/type";
import PredmetList from "@/Components/PredmetList/PredmetList";

export default function SliderPage() {
  const [predmets, setPredmets] = useState<Materials>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // завантаження даних
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGitHab();
      console.log("Fetched data:", data);
      setPredmets(data);
      setCategories(Object.keys(data));
    };

    fetchData();
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % categories.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + categories.length) % categories.length);

  // 🎹 Клавіатурне керування
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [categories]);

  if (categories.length === 0) {
    return <div className={styles.sliderWrapper}>Loading...</div>;
  }

  return (
    <div className={styles.sliderWrapper}>
      <button className={styles.arrow} onClick={prevSlide}>
        ◀
      </button>

      <div className={styles.slider}>
        {categories.map((category, index) => {
          const offset = index - current;
          return (
            <div
              key={category}
              className={`${styles.slide} ${
                offset === 0 ? styles.active : styles.inactive
              }`}
              style={{ transform: `translateX(${offset * 120}%)` }}
            >
              <button
                className={styles.card}
                onClick={() => setOpenCategory(category)}
              >
                <img
                  src={`https://via.placeholder.com/150?text=${category}`}
                  alt={category}
                />
                <p>{category}</p>
              </button>
            </div>
          );
        })}
      </div>

      <button className={styles.arrow} onClick={nextSlide}>
        ▶
      </button>

      {openCategory && (
        <Modal onClose={() => setOpenCategory(null)}>
          <h2>{openCategory}</h2>
          <ul>
            {predmets[openCategory]?.map((item, index) => (
              <PredmetList key={index} predmet={item} />
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}
