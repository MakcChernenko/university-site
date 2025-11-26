"use client";

import React, { useEffect, useState } from "react";
import { Logo } from "../Logo/logo";
import css from "./Header.module.css";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${css.container} ${scrolled ? css.scrolled : ""}`}>
      <Logo />
      <div className={css.menu}>
        <a href="#" className={css.item}>
          Про нас
        </a>
        <a href="./tutanhamon/ourService" className={css.item}>
          Послуги
        </a>
        <a href="#" className={css.item}>
          Партнерам
        </a>
        <a href="#" className={css.item}>
          Контакти
        </a>
        <a href="#" className={css.item}>
          Магазин
        </a>
      </div>
    </div>
  );
};
