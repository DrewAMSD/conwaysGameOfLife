import React, { useState, useEffect } from "react";
import "./GamePage.css";

function Cell(props) {
  const [statusCell, setStatusCell] = useState("dead");

  function handleClick() {
    if (!props.gameIsRunning) {
      setStatusCell(statusCell === "dead" ? "alive" : "dead");
    }
  }

  return (
    <>
      <div
        className={`cell ${
          statusCell === "alive" ? "cell-alive" : "cell-dead"
        }`}
        onClick={handleClick}
      ></div>
    </>
  );
}

function Grid(props) {
  let grid = [];

  function initializeGrid() {
    for (let i = 0; i < 15; i++) {
      let row = [];
      for (let j = 0; j < 15; j++) {
        row.push(Cell(props));
      }
      grid.push(row);
    }
  }
  initializeGrid();

  useEffect(() => {
    let intervalId;

    if (props.gameIsRunning) {
      intervalId = setInterval(() => {
        //write here each iteration of running the game
      }, 1000); // time interval inbetween running effect
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
              <div key={j}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Game() {
  const [gameIsRunning, setGameIsRunning] = useState(false);

  const startGame = () => {
    if (!gameIsRunning) {
      setGameIsRunning(true);
    }
  };

  const stopGame = () => {
    if (gameIsRunning) {
      setGameIsRunning(false);
    }
  };

  return (
    <>
      <div className="game-container">
        <div className="grid-container">
          <Grid gameIsRunning={gameIsRunning} />
        </div>
        <div className="game-buttons-container">
          <button
            className="game-buttons start-game-button"
            onClick={startGame}
          >
            Start Game
          </button>
          <button className="game-buttons stop-game-button" onClick={stopGame}>
            Stop Game
          </button>
        </div>
      </div>
    </>
  );
}

export default Game;
