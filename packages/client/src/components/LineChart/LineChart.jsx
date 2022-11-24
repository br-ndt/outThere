import React, { useEffect } from "react";
import * as d3 from "d3";

import styles from "./LineChart.module.scss";

export default function LineChart({
  data,
  height,
  width,
  yMax,
  yMin,
  markers,
}) {
  useEffect(() => {
    drawChart(data, height, width, yMax, yMin, markers);
  }, [data]);

  function drawChart(data, height, width, yMn, yMx, markers) {
    d3.select("#line-chart").select("svg").remove();
    d3.select("#line-chart").select(".tooltip").remove();

    const margin = { top: 52, right: 52, bottom: 4, left: 52 };

    const xMin = d3.min(data, (d) => d.index);
    const xMax = d3.max(data, (d) => d.index);
    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);

    const yMin = yMn || parseInt(d3.min(data, (d) => d.value)) - 10;
    const yScale = d3
      .scaleLinear()
      .range([height, yMin])
      .domain([0, yMx || 100]);

    const svg = d3
      .select("#line-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},0)`);

    const line = d3
      .line()
      .x((d) => xScale(d.index))
      .y((d) => yScale(d.value))
      .curve(d3.curveNatural);

    const defs = svg.append("defs");

    const mask = defs
      .append("mask")
      .attr("id", "heat-mask")
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 4);

    const gradient = defs
      .append("linearGradient")
      .attr("id", "heat-gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "#9E0059")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "quarter")
      .attr("offset", "25%")
      .attr("stop-color", "#FF0054")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "mid")
      .attr("offset", "50%")
      .attr("stop-color", "#FF5400")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "threeQuart")
      .attr("offset", "75%")
      .attr("stop-color", "#87BCDE")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "#390099")
      .attr("stop-opacity", 1);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(24)
          .tickFormat((d) => data[d].label)
      )
      .selectAll(".tick text")
      .attr("x", 8)
      .attr("y", 0)
      .attr("dy", ".55em")
      .attr("transform", "rotate(85)")
      .style("text-anchor", "start");

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickFormat((d) => `${d}°F`));

    svg
      .append("g")
      .attr("mask", "url(#heat-mask)")
      .attr("class", "gradient-line")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#heat-gradient)");

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("circle").attr("r", 3).attr("class", "circle");

    const tooltip = d3
      .select("#line-chart")
      .append("div")
      .attr("class", `${styles.card}`)
      .style("width", "80px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("position", "absolute");

    const tooltipText = tooltip.append("p").style("display", "inline-block");

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("opacity", 0)
      .on("mouseover", () => {
        focus.style("display", null);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(300).style("opacity", 0);
      })
      .on("mousemove", mouseMove);

    markers &&
      svg
        .append("g")
        .selectAll("marker")
        .data(markers)
        .enter()
        .append(circle)
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]))
        .attr("r", 4)
        .attr("transform", `translate(${100},${100})`)
        .style("fill", "#FFFFFF");

    function mouseMove(event) {
      const bisect = d3.bisector((d) => d.index).left;
      const xPos = d3.pointer(event)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      focus.attr(
        "transform",
        `translate(${xScale(d0.index)},${yScale(d0.value)})`
      );
      tooltip.transition().duration(100).style("opacity", 0.9);
      tooltip
        .style("left", `${xScale(d0.index)}px`)
        .style("top", `${yScale(d0.value) - 128}px`);
      tooltipText.html(d0.tooltipContent || d0.label);
    }
  }

  return <section id="line-chart" />;
}
