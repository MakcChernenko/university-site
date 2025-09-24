"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./Graph.module.css";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | string;
  target: Node | string;
  weight: number;
  linkNumber: number;
  dx?: number; // зсув по X для підпису
  dy?: number; // зсув по Y для підпису
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
      .attr("stroke-width", 2);

    // підписи ребер (тепер draggable)
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
      .style("cursor", "move")
      .each(function (d) {
        d.dx = 0;
        d.dy = 0;
      })
      .call(
        d3.drag<SVGTextElement, Link>().on("drag", function (event, d) {
          d.dx = (d.dx ?? 0) + event.dx;
          d.dy = (d.dy ?? 0) + event.dy;
          d3.select(this)
            .attr("x", +d3.select(this).attr("x") + event.dx)
            .attr("y", +d3.select(this).attr("y") + event.dy);
        })
      );

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
      .style("cursor", "grab")
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; // якщо хочеш щоб вершина знову "плавала", залишаємо null
            d.fy = null;
          })
      );

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
        .attr("x", (d) => {
          const x1 = typeof d.source !== "string" ? (d.source.x ?? 0) : 0;
          const x2 = typeof d.target !== "string" ? (d.target.x ?? 0) : 0;
          const mx = (x1 + x2) / 2;
          return mx + (d.dx ?? 0);
        })
        .attr("y", (d) => {
          const y1 = typeof d.source !== "string" ? (d.source.y ?? 0) : 0;
          const y2 = typeof d.target !== "string" ? (d.target.y ?? 0) : 0;
          const my = (y1 + y2) / 2;
          return my + (d.dy ?? 0);
        });

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);

      nodeLabel.attr("x", (d) => d.x ?? 0).attr("y", (d) => d.y ?? 0);
    });
  }, [nodes, links]);

  return <svg ref={svgRef} className={styles.svgContainer}></svg>;
};

export default GraphComponent;
