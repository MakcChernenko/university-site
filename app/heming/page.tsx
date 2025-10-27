"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

const findParityBits = (dataLength: number): number => {
  let R = 0;
  while (Math.pow(2, R) < dataLength + R + 1) {
    R++;
  }
  return R;
};

const calculateParity = (
  hammingCode: (string | number)[],
  parityPosition: number,
  totalLength: number
): number => {
  let parity = 0;
  for (let i = parityPosition; i <= totalLength; i++) {
    if ((i & parityPosition) !== 0) {
      if (i !== parityPosition) {
        parity = parity ^ parseInt(String(hammingCode[i - 1]), 10);
      }
    }
  }
  return parity;
};
const encodeHamming = (data: string): string => {
  if (data.length === 0) return "";
  const K = data.length;
  const R = findParityBits(K);
  const N = K + R;
  const dataBits = data.split("").map((b) => parseInt(b, 10));

  const hammingCode: (string | number)[] = Array(N).fill("P");

  let dataIndex = 0;
  for (let i = 1; i <= N; i++) {
    if ((i & (i - 1)) !== 0) {
      if (dataIndex < dataBits.length) {
        hammingCode[i - 1] = dataBits[dataIndex];
        dataIndex++;
      }
    }
  }

  for (let i = 0; i < R; i++) {
    const parityPosition = Math.pow(2, i);
    const parityValue = calculateParity(hammingCode, parityPosition, N);
    hammingCode[parityPosition - 1] = parityValue;
  }

  return hammingCode.join("");
};

const decodeAndCorrectHamming = (
  receivedCode: string
): {
  correctedCode: string;
  errorPosition: number;
  syndrome: string;
} => {
  const N = receivedCode.length;
  const R = findParityBits(N);
  const receivedBits = receivedCode.split("").map((b) => parseInt(b, 10));

  let syndrome = "";
  let errorPosition = 0;

  for (let i = 0; i < R; i++) {
    const parityPosition = Math.pow(2, i);
    let parityCheck = 0;

    for (let j = 1; j <= N; j++) {
      if ((j & parityPosition) !== 0) {
        parityCheck = parityCheck ^ receivedBits[j - 1];
      }
    }
    syndrome = parityCheck.toString() + syndrome;

    if (parityCheck === 1) {
      errorPosition += parityPosition;
    }
  }

  let correctedCode = receivedCode;

  if (errorPosition > 0 && errorPosition <= N) {
    const errorIndex = errorPosition - 1;
    const newBit = receivedBits[errorIndex] === 0 ? 1 : 0;

    const codeArray = correctedCode.split("");
    codeArray[errorIndex] = newBit.toString();
    correctedCode = codeArray.join("");
  }

  return { correctedCode, errorPosition, syndrome };
};

const HammingCodeSimulator: React.FC = () => {
  const [dataInput, setDataInput] = useState("10110010");
  const [errorIndex, setErrorIndex] = useState("");
  const [receivedCode, setReceivedCode] = useState("");
  const [status, setStatus] = useState<"IDLE" | "ENCODED" | "ERROR">("IDLE");

  const K = dataInput.length;
  const R = useMemo(() => findParityBits(K), [K]);
  const N = K + R;

  const encodedHamming = useMemo(() => {
    if (K === 0 || !dataInput.match(/^[01]+$/)) return "";
    return encodeHamming(dataInput);
  }, [dataInput, K]);

  const results = useMemo(() => {
    if (!receivedCode.match(/^[01]+$/) || receivedCode.length !== N) {
      return null;
    }
    return decodeAndCorrectHamming(receivedCode);
  }, [receivedCode, N]);

  const handleEncode = () => {
    if (encodedHamming) {
      setReceivedCode(encodedHamming);
      setErrorIndex("");
      setStatus("ENCODED");
    }
  };

  const handleErrorInjection = () => {
    const index = parseInt(errorIndex, 10);

    if (!encodedHamming) {
      alert("Спочатку закодуйте слово.");
      return;
    }

    if (isNaN(index) || index < 1 || index > N) {
      alert(`Неправильна позиція помилки. Введіть число від 1 до ${N}.`);
      return;
    }

    const encodedArray = encodedHamming.split("");
    const bitToFlip = encodedArray[index - 1];

    encodedArray[index - 1] = bitToFlip === "0" ? "1" : "0";

    setReceivedCode(encodedArray.join(""));
    setStatus("ERROR");
  };

  const BitDisplay: React.FC<{ code: string }> = ({ code }) => (
    <span
      style={{
        fontWeight: "bold",
        letterSpacing: "2px",
        fontFamily: "monospace",
      }}
    >
      {code.split("").map((bit, index) => {
        const isParityBit =
          Math.pow(2, Math.round(Math.log2(index + 1))) === index + 1;

        return (
          <span
            key={index}
            title={`Позиція: ${index + 1}`}
            style={{
              color: isParityBit ? "#dc3545" : "#007bff",
              marginRight: index % 4 === 3 ? "4px" : "0",
            }}
          >
            {bit}
          </span>
        );
      })}
    </span>
  );

  const containerStyle: React.CSSProperties = {
    padding: "30px",
    maxWidth: "900px",
    margin: "30px auto",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid",
    transition: "background-color 0.3s",
    marginLeft: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
        Симулятор Коду Гемінга
      </h1>
      <p style={{ fontSize: "1.1em", fontWeight: "bold" }}>
        **Параметри коду:** (Дані) = {K},(Контр. біти) = {R}, (Загалом) = {N}.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h2>1. Введення даних</h2>
        <input
          type="text"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value.replace(/[^01]/g, ""))}
          style={{
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Введіть двійкове слово (0/1)"
        />
        <button
          onClick={handleEncode}
          style={{
            ...buttonStyle,
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            color: "white",
          }}
        >
          Кодувати
        </button>
      </div>

      {encodedHamming && (
        <div
          style={{
            borderLeft: "3px solid #007bff",
            paddingLeft: "15px",
            marginBottom: "20px",
          }}
        >
          <h3>2. Закодоване слово (Надсилання)</h3>
          <p>
            **Код Гемінга:** <BitDisplay code={encodedHamming} />
          </p>
        </div>
      )}

      {status !== "IDLE" && (
        <div
          style={{
            marginBottom: "20px",
            borderLeft: "3px solid #ffc107",
            paddingLeft: "15px",
          }}
        >
          <h2>3. Моделювання помилки</h2>
          <p>
            Поточний код (відправлений/отриманий):{" "}
            <BitDisplay code={receivedCode} />
          </p>

          <input
            type="number"
            value={errorIndex}
            onChange={(e) => setErrorIndex(e.target.value)}
            min={1}
            max={N}
            style={{
              padding: "10px",
              width: "150px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder={`Позиція (1 - ${N})`}
          />
          <button
            onClick={handleErrorInjection}
            style={{
              ...buttonStyle,
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "black",
            }}
          >
            Ввести помилку
          </button>
        </div>
      )}

      {status === "ERROR" && results && (
        <div style={{ borderLeft: "3px solid #28a745", paddingLeft: "15px" }}>
          <h2>4. Виявлення та Виправлення</h2>

          <p>
            **Синдром (P{R} ... P1):**{" "}
            <span
              style={{
                fontWeight: "bold",
                color: results.errorPosition > 0 ? "#dc3545" : "#28a745",
              }}
            >
              {results.syndrome}
            </span>
          </p>

          {results.errorPosition > 0 ? (
            <>
              <p style={{ color: "#dc3545", fontWeight: "bold" }}>
                **ПОМИЛКА ЗНАЙДЕНА!** Позиція помилки: **{results.errorPosition}
                ** (позиція в коді Гемінга).
              </p>
              <p>
                **Виправлений Код:** <BitDisplay code={results.correctedCode} />
              </p>
            </>
          ) : (
            <p style={{ color: "#28a745", fontWeight: "bold" }}>
              **Помилок не знайдено.**
            </p>
          )}
        </div>
      )}
      <Link style={{ color: "green" }} href="/calculate">
        Калькулятор і конвертер двійкових чисел(допомагає)
      </Link>
    </div>
  );
};

export default HammingCodeSimulator;
