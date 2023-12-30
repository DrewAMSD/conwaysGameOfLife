import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let intervalId;

    if (gameIsRunning) {
      intervalId = setInterval(() => {
        console.log("game is running");
        //write here each iteration of running the game
      }, 1000); // time interval inbetween running effect(1 sec)
    }

    /*when useEffect is called again(gameIsRunning changes values) or 
    the programs unmounts(for example you leave the page that has grid), 
    this cleanup(return) is automatically called before running the 
    useEffect again, clearing/stopping the interval*/
    return () => {
      clearInterval(intervalId);
    };
  }, [gameIsRunning]);

  return (
    <>
      <div className="game-container">
        <div className="grid-container">
          <Grid
            gameIsRunning={gameIsRunning}
            setGameIsRunning={setGameIsRunning}
          />
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
