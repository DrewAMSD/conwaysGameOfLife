import React, { useState } from "react";
import "./GamePage.css";
import Grid from "../components/Grid";

export default function Game() {
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
