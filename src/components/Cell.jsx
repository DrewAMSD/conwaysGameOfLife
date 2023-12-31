import React, { useState } from "react";
import "./Cell.css";

export default function Cell(props) {
  const [statusCell, setStatusCell] = useState(props.stateCell);

  function updateCell() {
    if (!props.gameIsRunning) {
      setStatusCell((prevStatusCell) =>
        prevStatusCell === "dead" ? "alive" : "dead"
      );
    }
  }

  return (
    <>
      <div
        className={`cell ${
          statusCell === "alive" ? "cell-alive" : "cell-dead"
        }`}
        onClick={updateCell}
      >
        {statusCell}
      </div>
    </>
  );
}
