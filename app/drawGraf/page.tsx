"use client";
import { useState } from "react";
import GraphComponent from "../../Components/GraphComponent/GraphComponent";
import styles from "../../Components/GraphComponent/Graph.module.css";

interface Node {
  id: string;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
  linkNumber?: number; // будемо додавати при рендері
}

export default function HomePage() {
  const [numEdges, setNumEdges] = useState(0);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isGraphRendered, setIsGraphRendered] = useState(false);

  const handleNumEdgesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setNumEdges(count);

    setEdges(
      Array.from({ length: count }, () => ({
        source: "",
        target: "",
        weight: 0,
      }))
    );

    setIsGraphRendered(false);
  };

  const handleEdgeChange = <K extends keyof Edge>(
    index: number,
    field: K,
    value: Edge[K]
  ) => {
    const newEdges = [...edges];
    newEdges[index] = { ...newEdges[index], [field]: value };
    setEdges(newEdges);
  };

  const renderGraph = () => {
    const uniqueNodes = new Set<string>();

    edges.forEach((edge) => {
      if (edge.source) uniqueNodes.add(edge.source);
      if (edge.target) uniqueNodes.add(edge.target);
    });

    const nodesArray: Node[] = Array.from(uniqueNodes)
      .sort()
      .map((id) => ({ id }));

    setNodes(nodesArray);
    setIsGraphRendered(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Візуалізація Графа</h1>

      <div className={styles.inputSection}>
        <label>
          Кількість ребер:
          <input
            type="number"
            value={numEdges}
            onChange={handleNumEdgesChange}
            min="0"
          />
        </label>
      </div>

      {numEdges > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.graphTable}>
            <thead>
              <tr>
                <th>Номер ребра</th>
                <th>Вершина 1</th>
                <th>Вершина 2</th>
                <th>Вага</th>
              </tr>
            </thead>
            <tbody>
              {edges.map((edge, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={edge.source}
                      onChange={(e) =>
                        handleEdgeChange(index, "source", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={edge.target}
                      onChange={(e) =>
                        handleEdgeChange(index, "target", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={isNaN(edge.weight) ? "" : edge.weight}
                      onChange={(e) =>
                        handleEdgeChange(
                          index,
                          "weight",
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.button} onClick={renderGraph}>
            Рендер графа
          </button>
        </div>
      )}

      {isGraphRendered && nodes.length > 0 && (
        <GraphComponent
          nodes={nodes}
          links={edges.map((edge, index) => ({
            ...edge,
            linkNumber: index + 1,
          }))}
        />
      )}
    </div>
  );
}
