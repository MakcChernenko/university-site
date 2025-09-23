"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./Graph.module.css";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  x?: number;
  y?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | string;
  target: Node | string;
  weight: number;
  linkNumber: number;
}

interface GraphProps {
  nodes: Node[];
  links: Link[];
}

const GraphComponent: React.FC<GraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = 800;
  const height = 600;

  useEffect(() => {
    if (!svgRef.current) return;

    // очистка перед новим рендером
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const maxWeight = d3.max(links, (d) => d.weight) || 1;
    const minWeight = d3.min(links, (d) => d.weight) || 1;

    const lengthScale = d3
      .scaleLinear()
      .domain([minWeight, maxWeight])
      .range([100, 300]);

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance((d) => lengthScale(d.weight))
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // ребра
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 2)
      .attr("class", "link");

    // підписи ребер
    const linkText = svg
      .append("g")
      .attr("class", "link-labels")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .text((d) => `${d.linkNumber} (${d.weight})`)
      .attr("font-size", "12px")
      .attr("fill", "white")
      .attr("dy", -5);

    // вузли
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .attr("class", "node");

    // підписи вузлів
    const nodeLabel = svg
      .append("g")
      .attr("class", "node-labels")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", "12px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("pointer-events", "none");

    // оновлення позицій
    simulation.on("tick", () => {
      link
        .attr("x1", (d) =>
          typeof d.source !== "string" ? (d.source.x ?? 0) : 0
        )
        .attr("y1", (d) =>
          typeof d.source !== "string" ? (d.source.y ?? 0) : 0
        )
        .attr("x2", (d) =>
          typeof d.target !== "string" ? (d.target.x ?? 0) : 0
        )
        .attr("y2", (d) =>
          typeof d.target !== "string" ? (d.target.y ?? 0) : 0
        );

      linkText
        .attr(
          "x",
          (d) =>
            ((typeof d.source !== "string" ? (d.source.x ?? 0) : 0) +
              (typeof d.target !== "string" ? (d.target.x ?? 0) : 0)) /
            2
        )
        .attr(
          "y",
          (d) =>
            ((typeof d.source !== "string" ? (d.source.y ?? 0) : 0) +
              (typeof d.target !== "string" ? (d.target.y ?? 0) : 0)) /
            2
        );

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);

      nodeLabel.attr("x", (d) => d.x ?? 0).attr("y", (d) => d.y ?? 0);
    });
  }, [nodes, links]);

  return <svg ref={svgRef} className={styles.svgContainer}></svg>;
};

export default GraphComponent;
