import React, { useState } from "react";
import "./Cell.css";

export default function Cell(props) {
  const [statusCell, setStatusCell] = useState(props.stateCell);

  function handleClick() {
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
        onClick={handleClick}
      >
        {statusCell}
      </div>
    </>
  );
}
