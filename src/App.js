import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, line, curveCardinal } from "d3";

function App() {
  const [data, setData] = useState([
    32,
    34,
    65,
    27,
    84,
    23,
    43,
    64,
    36,
    38,
    34,
    76,
    21,
    75
  ]);
  //create reference object to pass to dom element <svg>
  const svgRef = useRef();

  //callback gets triggered once dom elements are rendeered or when passed in ,[data] changes
  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    const myLine = line()
      .x((i, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal);

    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join(
    //     enter => enter.append("circle").attr("class", "new"),
    //     update => update.attr("class", "updated"),
    //     exit => exit.remove()
    //   )
    //   .attr("r", value => value)
    //   .attr("cx", value => value * 2)
    //   .attr("cy", value => value * 2)
    //   .attr("stroke", "red");

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map(value => value + 8))}>
        Random
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter
      </button>
    </>
  );
}

export default App;
