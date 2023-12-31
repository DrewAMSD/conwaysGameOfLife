import React from "react";
import "./Cell.css";

export default function Cell(props) {
  const statusCell = props.stateCell;

  return (
    <>
      <div
        className={`cell ${
          statusCell === "alive" ? "cell-alive" : "cell-dead"
        }`}
      >
        {statusCell}
      </div>
    </>
  );
}
