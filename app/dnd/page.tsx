"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./dnd.module.css";

// Типи характеристик
type StatKey = "str" | "con" | "int" | "wis" | "dex" | "cha";

type Stats = Record<StatKey, number>;

const MIN = 1;
const MAX = 20;
const BASE = 10;

const CHARACTER_PRESETS: Record<string, { img: string; hint: Partial<Stats> }> =
  {
    Воїн: {
      img: "https://cdn.27.ua/sc--media--prod/default/93/78/cf/9378cf63-951e-4b01-bb2c-bb902c30ad76.jpg",
      hint: { str: 12, con: 12 },
    },
    Маг: {
      img: "https://blizzard.org.ua/wa-data/public/shop/products/79/32/3279/images/5509/5509.750x0.jpg",
      hint: { int: 12, wis: 12 },
    },
    Розбійник: {
      img: "https://www.mzk2.ru/wp-content/uploads/2018/02/gennadij-mihajlov-solenyj.jpg",
      hint: { dex: 12, cha: 11 },
    },
    Бард: {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGctHl3sUqDMiKRkZdap0GQh2_nSD7irIE9g&s",
      hint: { cha: 12, dex: 11 },
    },
  };

export default function DndPage() {
  const [stats, setStats] = useState<Stats>({
    str: BASE,
    con: BASE,
    int: BASE,
    wis: BASE,
    dex: BASE,
    cha: BASE,
  });

  // Окремий пул тільки для Ловкості та Харизми
  const [dexChaPool, setDexChaPool] = useState<number>(5);

  // Обраний тип персонажа
  const [charType, setCharType] = useState<string>("Воїн");

  // Скільки очок уже витрачено на DEX/CHA понад базові 10
  const dexChaSpent = useMemo(() => {
    const overDex = Math.max(0, stats.dex - BASE);
    const overCha = Math.max(0, stats.cha - BASE);
    return overDex + overCha;
  }, [stats.dex, stats.cha]);

  const dexChaRemaining = Math.max(0, dexChaPool - dexChaSpent);

  // Універсальна перевірка меж
  const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

  // Зв'язка: STR <-> INT
  const bumpStr = (delta: 1 | -1) => {
    setStats((prev) => {
      const nextStr = clamp(prev.str + delta);
      const nextInt = clamp(prev.int - delta);
      // якщо зсув зламав зв'язку (через межі) — відхиляємо
      if (nextStr === prev.str || nextInt === prev.int) return prev;
      return { ...prev, str: nextStr, int: nextInt };
    });
  };

  const bumpInt = (delta: 1 | -1) => {
    setStats((prev) => {
      const nextInt = clamp(prev.int + delta);
      const nextStr = clamp(prev.str - delta);
      if (nextInt === prev.int || nextStr === prev.str) return prev;
      return { ...prev, int: nextInt, str: nextStr };
    });
  };

  // Зв'язка: CON <-> WIS
  const bumpCon = (delta: 1 | -1) => {
    setStats((prev) => {
      const nextCon = clamp(prev.con + delta);
      const nextWis = clamp(prev.wis - delta);
      if (nextCon === prev.con || nextWis === prev.wis) return prev;
      return { ...prev, con: nextCon, wis: nextWis };
    });
  };

  const bumpWis = (delta: 1 | -1) => {
    setStats((prev) => {
      const nextWis = clamp(prev.wis + delta);
      const nextCon = clamp(prev.con - delta);
      if (nextWis === prev.wis || nextCon === prev.con) return prev;
      return { ...prev, wis: nextWis, con: nextCon };
    });
  };

  // DEX/CHA керуються пулом: можна підвищувати понад 10 лише в межах залишку
  const bumpDex = (delta: 1 | -1) => {
    setStats((prev) => {
      const candidate = clamp(prev.dex + delta);
      // Якщо знижуємо — завжди дозволено (до MIN)
      if (delta === -1) return { ...prev, dex: candidate };
      // Якщо підвищуємо — перевіряємо ліміт і залишок пулу
      const add = Math.max(0, candidate - BASE) - Math.max(0, prev.dex - BASE);
      if (add <= dexChaRemaining) return { ...prev, dex: candidate };
      return prev;
    });
  };

  const bumpCha = (delta: 1 | -1) => {
    setStats((prev) => {
      const candidate = clamp(prev.cha + delta);
      if (delta === -1) return { ...prev, cha: candidate };
      const add = Math.max(0, candidate - BASE) - Math.max(0, prev.cha - BASE);
      if (add <= dexChaRemaining) return { ...prev, cha: candidate };
      return prev;
    });
  };

  const preset = CHARACTER_PRESETS[charType];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.character}>
            <div className={styles.portraitWrap}>
              {/* Image з заповненням контейнера */}
              <Image
                src={preset.img}
                alt={charType}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className={styles.portrait}
                priority
              />
            </div>
            <label className={styles.selectLabel}>
              Тип персонажа
              <select
                className={styles.select}
                value={charType}
                onChange={(e) => setCharType(e.target.value)}
              >
                {Object.keys(CHARACTER_PRESETS).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.poolBox}>
            <label className={styles.selectLabel}>
              Очки для Ловкості+Харизми
              <input
                type="number"
                min={0}
                max={50}
                value={dexChaPool}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setDexChaPool(Math.max(0, Math.min(50, v)));
                }}
                className={styles.poolInput}
              />
            </label>
            <div className={styles.poolInfo}>
              Залишок: <strong>{dexChaRemaining}</strong>
            </div>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Характеристика</th>
              <th>Значення</th>
              <th aria-label="Керування"></th>
            </tr>
          </thead>
          <tbody>
            <Row
              name="Сила"
              value={stats.str}
              onDec={() => bumpStr(-1)}
              onInc={() => bumpStr(1)}
            />
            <Row
              name="Інтелект"
              value={stats.int}
              onDec={() => bumpInt(-1)}
              onInc={() => bumpInt(1)}
            />
            <Row
              name="Тілобудова"
              value={stats.con}
              onDec={() => bumpCon(-1)}
              onInc={() => bumpCon(1)}
            />
            <Row
              name="Мудрість"
              value={stats.wis}
              onDec={() => bumpWis(-1)}
              onInc={() => bumpWis(1)}
            />
            <Row
              name="Ловкість"
              value={stats.dex}
              onDec={() => bumpDex(-1)}
              onInc={() => bumpDex(1)}
              hint={`+${Math.max(0, stats.dex - BASE)} з пулу`}
            />
            <Row
              name="Харизма"
              value={stats.cha}
              onDec={() => bumpCha(-1)}
              onInc={() => bumpCha(1)}
              hint={`+${Math.max(0, stats.cha - BASE)} з пулу`}
            />
          </tbody>
        </table>
      </div>

      <p className={styles.note}>
        ✨ Правила: кожна характеристика стартує з 10 і має межі від 1 до 20.
        Сила ↔ Інтелект та Тілобудова ↔ Мудрість змінюються дзеркально. На
        Ловкість і Харизму є окремий пул очок.
      </p>
    </div>
  );
}
function Row({
  name,
  value,
  onDec,
  onInc,
  hint,
}: {
  name: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  hint?: string;
}) {
  return (
    <tr>
      <td className={styles.statName}>
        {name}
        {hint && <span className={styles.hint}>{hint}</span>}
      </td>
      <td className={styles.value}>{value}</td>
      <td className={styles.controls}>
        <button
          className={styles.btn}
          onClick={onDec}
          aria-label={`Зменшити ${name}`}
        >
          −
        </button>
        <button
          className={styles.btn}
          onClick={onInc}
          aria-label={`Збільшити ${name}`}
        >
          +
        </button>
      </td>
    </tr>
  );
}
