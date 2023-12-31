import React, { useState } from "react";
import Cell from "../components/Cell";
import "./Grid.css";

const initializeGrid = (props) => {
  let tempGrid = [];
  for (let i = 0; i < 15; i++) {
    let row = [];
    for (let j = 0; j < 15; j++) {
      row.push(<Cell {...props} stateCell="dead" />);
    }
    tempGrid.push(row);
  }
  return tempGrid;
};

export default function Grid(props) {
  const [grid, setGrid] = useState(initializeGrid(props));

  return (
    <>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="grid-row" key={i}>
            {row.map((cell, j) => (
              <div key={j}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
