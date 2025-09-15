"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./drawGraf.module.css";

type Edge = {
  from: number;
  to: number;
  weight: number;
};

export default function GraphBuilder() {
  const [edges, setEdges] = useState<Edge[]>([
    { from: 1, to: 2, weight: 5 },
    { from: 2, to: 3, weight: 7 },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // малювання графа
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // вершини
    const vertices = Array.from(new Set(edges.flatMap((e) => [e.from, e.to])));
    const radius = 180;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const positions: Record<number, { x: number; y: number }> = {};
    vertices.forEach((v, i) => {
      const angle = (2 * Math.PI * i) / vertices.length;
      positions[v] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // ребра
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    edges.forEach((e, i) => {
      const { x: x1, y: y1 } = positions[e.from];
      const { x: x2, y: y2 } = positions[e.to];

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#2563eb";
      ctx.stroke();

      // підпис
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.fillText(`${i + 1} (${e.weight})`, midX, midY);
    });

    // вершини
    vertices.forEach((v) => {
      const { x, y } = positions[v];
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(String(v), x - 4, y + 4);
    });
  }, [edges]);

  // зміна даних у таблиці
  const handleChange = (index: number, field: keyof Edge, value: string) => {
    const newEdges = [...edges];
    newEdges[index] = {
      ...newEdges[index],
      [field]: Number(value),
    };
    setEdges(newEdges);
  };

  const addRow = () => setEdges([...edges, { from: 1, to: 1, weight: 1 }]);
  const removeRow = (index: number) =>
    setEdges(edges.filter((_, i) => i !== index));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Побудова графа з таблиці</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Поле</th>
              {edges.map((_, i) => (
                <th key={i}>
                  Ребро {i + 1}
                  <button
                    onClick={() => removeRow(i)}
                    className={styles.deleteBtn}
                  >
                    ✕
                  </button>
                </th>
              ))}
              <th>
                <button onClick={addRow} className={styles.addBtn}>
                  ➕
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Н.В.</td>
              {edges.map((edge, i) => (
                <td key={i}>
                  <input
                    type="number"
                    value={edge.from}
                    onChange={(e) => handleChange(i, "from", e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>К.В.</td>
              {edges.map((edge, i) => (
                <td key={i}>
                  <input
                    type="number"
                    value={edge.to}
                    onChange={(e) => handleChange(i, "to", e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Вага</td>
              {edges.map((edge, i) => (
                <td key={i}>
                  <input
                    type="number"
                    value={edge.weight}
                    onChange={(e) => handleChange(i, "weight", e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} width={800} height={600}></canvas>
      </div>
    </div>
  );
}
