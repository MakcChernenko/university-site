"use client";

import { useState } from "react";
import styles from "./calculate.module.css"; // імпорт модульних стилів

export default function BaseCalculator() {
  // Стейти для калькулятора
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [baseCalc, setBaseCalc] = useState(10);
  const [operation, setOperation] = useState("add");
  const [calcResult, setCalcResult] = useState("");

  // Стейти для конвертера
  const [inputNumber, setInputNumber] = useState("");
  const [baseConv, setBaseConv] = useState(10);
  const [convResult, setConvResult] = useState("");

  // Функція обчислення
  const calculate = () => {
    const val1 = parseInt(num1.trim(), baseCalc);
    const val2 = parseInt(num2.trim(), baseCalc);

    if (isNaN(val1) || isNaN(val2)) {
      setCalcResult("❌ Помилка: некоректні числа!");
      return;
    }

    let result: number;
    switch (operation) {
      case "add":
        result = val1 + val2;
        break;
      case "sub":
        result = val1 - val2;
        break;
      case "mul":
        result = val1 * val2;
        break;
      case "div":
        if (val2 === 0) {
          setCalcResult("❌ Помилка: ділення на нуль!");
          return;
        }
        result = Math.floor(val1 / val2);
        break;
      default:
        return;
    }

    setCalcResult(
      `Результат (${baseCalc}-кова система): ${result
        .toString(baseCalc)
        .toUpperCase()}\nУ десятковій: ${result}`
    );
  };

  // Функція конвертера
  const convertNumber = () => {
    const decimalValue = parseInt(inputNumber.trim(), baseConv);

    if (isNaN(decimalValue)) {
      setConvResult("❌ Помилка: некоректне число!");
      return;
    }

    setConvResult(
      `Результати:\n` +
        `Двійкова (2): ${decimalValue.toString(2)}\n` +
        `Трійкова (3): ${decimalValue.toString(3)}\n` +
        `Вісімкова (8): ${decimalValue.toString(8)}\n` +
        `Десяткова (10): ${decimalValue}\n` +
        `Шістнадцяткова (16): ${decimalValue.toString(16).toUpperCase()}`
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Калькулятор систем числення</h1>

      {/* Арифметичні операції */}
      <section className={styles.card}>
        <h2 className={styles.subtitle}>Арифметичні операції</h2>

        <label>Перше число:</label>
        <input
          type="text"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="наприклад 1010"
          className={styles.input}
        />

        <label>Друге число:</label>
        <input
          type="text"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="наприклад 111"
          className={styles.input}
        />

        <label>Система числення:</label>
        <select
          value={baseCalc}
          onChange={(e) => setBaseCalc(parseInt(e.target.value))}
          className={styles.select}
        >
          <option value={2}>Двійкова (2)</option>
          <option value={3}>Трійкова (3)</option>
          <option value={8}>Вісімкова (8)</option>
          <option value={10}>Десяткова (10)</option>
          <option value={16}>Шістнадцяткова (16)</option>
        </select>

        <label>Операція:</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className={styles.select}
        >
          <option value="add">Додавання (+)</option>
          <option value="sub">Віднімання (-)</option>
          <option value="mul">Множення (×)</option>
          <option value="div">Ділення (÷)</option>
        </select>

        <button onClick={calculate} className={styles.buttonPrimary}>
          Обчислити
        </button>

        <pre className={styles.output}>{calcResult}</pre>
      </section>

      {/* Конвертер чисел */}
      <section className={styles.card}>
        <h2 className={styles.subtitle}>Конвертер чисел</h2>

        <label>Введіть число:</label>
        <input
          type="text"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          placeholder="наприклад 1010"
          className={styles.input}
        />

        <label>Система числення:</label>
        <select
          value={baseConv}
          onChange={(e) => setBaseConv(parseInt(e.target.value))}
          className={styles.select}
        >
          <option value={2}>Двійкова (2)</option>
          <option value={3}>Трійкова (3)</option>
          <option value={8}>Вісімкова (8)</option>
          <option value={10}>Десяткова (10)</option>
          <option value={16}>Шістнадцяткова (16)</option>
        </select>

        <button onClick={convertNumber} className={styles.buttonSecondary}>
          Перетворити
        </button>

        <pre className={styles.output}>{convResult}</pre>
      </section>
    </div>
  );
}
