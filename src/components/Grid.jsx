import React, { useState, useEffect } from "react";
import Cell from "../components/Cell";
import "./Grid.css";

const initializeGrid = (props) => {
  const tempGrid = [];
  for (let i = 0; i < 15; i++) {
    let row = [];
    for (let j = 0; j < 15; j++) {
      row.push(<Cell props={props} stateCell="dead" />);
    }
    tempGrid.push(row);
  }
  return tempGrid;
};

const initializeGridStates = () => {
  const tempGrid = [];
  for (let i = 0; i < 15; i++) {
    let row = [];
    for (let j = 0; j < 15; j++) {
      row.push("dead");
    }
    tempGrid.push(row);
  }
  return tempGrid;
};

export default function Grid(props) {
  const [grid, setGrid] = useState(() => initializeGrid(props));
  const [gridStates, setGridStates] = useState(() => initializeGridStates());

  const updateCell = (i, j) => {
    setGridStates((prevGridStates) => {
      const newGridStates = [...prevGridStates];
      newGridStates[i][j] = newGridStates[i][j] === "dead" ? "alive" : "dead";
      return newGridStates;
    });

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[i][j] = <Cell stateCell={gridStates[i][j]} />;
      return newGrid;
    });
  };

  const updateGrid = () => {
    setGrid(
      gridStates.map((row, i) =>
        row.map((state, j) => <Cell stateCell={state} />)
      )
    );
  };

  const isCorner = (r, c) => {
    return (
      (r === 0 && c === 0) ||
      (r === 0 && c === 14) ||
      (r === 14 && c === 0) ||
      (r === 14 && c === 14)
    );
  };

  const isEdge = (r, c) => {
    return r === 0 || r === 14 || c === 0 || c === 14;
  };

  const countNeighbors = (r, c, prevGridStates) => {
    let count = 0;
    if (isCorner(r, c)) {
      //logic for 5 neighbors
    } else if (isEdge(r, c)) {
      //logic for 5 neighbors
    } else {
      for (let i = r - 1; i <= r + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
          if (i !== r || j !== c) {
            if (prevGridStates[i][j] === "alive") {
              count++;
            }
          }
        }
      }
    }
    return count;
  };

  const nextGeneration = () => {
    setGridStates((prevGridStates) => {
      const nextGen = [];
      for (let i = 0; i < 15; i++) {
        const row = [];
        for (let j = 0; j < 15; j++) {
          const temp = prevGridStates[i][j];
          row.push(temp);
        }
        nextGen.push(row);
      }

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          let count = countNeighbors(i, j, prevGridStates);
          if (prevGridStates[i][j] === "dead") {
            if (count === 3) {
              nextGen[i][j] = "alive";
            }
          } else {
            if (count !== 2 && count !== 3) {
              nextGen[i][j] = "dead";
            }
          }
        }
      }

      return nextGen;
    });
  };

  useEffect(() => {
    let intervalId;

    if (props.gameIsRunning) {
      intervalId = setInterval(() => {
        nextGeneration();
        updateGrid();
        console.log("game is running");
        console.log(gridStates);
      }, 2000); // time interval inbetween running effect(2 sec)
    }

    /*when useEffect is called again(gameIsRunning changes values) or 
    the programs unmounts(for example you leave the page that has grid), 
    this cleanup(return) is automatically called before running the 
    useEffect again, clearing/stopping the interval*/
    return () => {
      clearInterval(intervalId);
    };
  }, [props.gameIsRunning]);

  return (
    <>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="grid-row" key={i}>
            {row.map((cell, j) => (
              <div key={j} onClick={(e) => updateCell(i, j)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
