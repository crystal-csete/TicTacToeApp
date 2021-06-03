/** @format */

import React, { useState, useEffect } from "react";
import "./App.css";
import { winning_combos } from "./WinningCombo";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player_turn, setPlayer_turn] = useState("⭕");
  const [results, setResults] = useState({ winner: "None", state: "None" });

  useEffect(() => {
    isTie();
    hasWon();

    if (player_turn === "❌") {
      setPlayer_turn("⭕");
    } else {
      setPlayer_turn("❌");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    if (results.state !== "None") {
      alert(`Winner: player ${results.winner} has won the game`);
      restartGame();
    }
  }, [results]);

  const pickSquare = (square) => {
    setBoard(
      board.map((value, index) => {
        if (index === square && value === "") {
          return player_turn;
        }

        return value;
      })
    );
  };

  const hasWon = () => {
    winning_combos.forEach((currentWinningCombo) => {
      const player1 = board[currentWinningCombo[0]];
      if (player1 === "") return;
      let foundWinner = true;
      currentWinningCombo.forEach((index) => {
        if (board[index] !== player1) {
          foundWinner = false;
        }
      });

      if (foundWinner) {
        setResults({ winner: player_turn, state: "Won" });
      }
    });
  };

  const isTie = () => {
    let checked = true;
    board.forEach((square) => {
      if (square === "") {
        checked = false;
      }
    });

    if (checked) {
      setResults({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer_turn("⭕");
  };

  return (
    <div className='app__container'>
      <h1>Tic Tac Toe</h1>
      <div className='board'>
        {board.map((square, index, board) => {
          return (
            <div onClick={() => pickSquare(index, board)} className='square'>
              <h3 className='symbol'>{square}</h3>
            </div>
          );
        })}
      </div>
      <footer>Crystal's Pages &#0169; 2021</footer>
    </div>
  );
}

export default App;
