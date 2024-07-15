import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';

const BOARD_SIZE = 5;
const SHIPS = [2, 3];

const initializeBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  return board;
};

const placeShipsRandomly = (board) => {
  const newBoard = board.map(row => row.slice());
  SHIPS.forEach(shipLength => {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);

      if (orientation === 'H' && col + shipLength <= BOARD_SIZE) {
        if (newBoard[row].slice(col, col + shipLength).every(cell => cell === null)) {
          for (let i = 0; i < shipLength; i++) {
            newBoard[row][col + i] = 'S';
          }
          placed = true;
        }
      } else if (orientation === 'V' && row + shipLength <= BOARD_SIZE) {
        if (newBoard.slice(row, row + shipLength).every(r => r[col] === null)) {
          for (let i = 0; i < shipLength; i++) {
            newBoard[row + i][col] = 'S';
          }
          placed = true;
        }
      }
    }
  });
  return newBoard;
};

const App = () => {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard);
  const [computerBoard, setComputerBoard] = useState(initializeBoard);
  const [hiddenComputerBoard, setHiddenComputerBoard] = useState(initializeBoard);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setPlayerBoard(placeShipsRandomly(initializeBoard()));
    setHiddenComputerBoard(placeShipsRandomly(initializeBoard()));
  }, []);

  const handlePlayerMove = (row, col) => {
    if (gameOver || computerBoard[row][col] !== null) return;

    const newBoard = computerBoard.map(row => row.slice());
    if (hiddenComputerBoard[row][col] === 'S') {
      newBoard[row][col] = 'H';
    } else {
      newBoard[row][col] = 'M';
    }

    setComputerBoard(newBoard);
    checkWinner(newBoard, 'Player');
    if (!gameOver) handleComputerMove();
  };

  const handleComputerMove = () => {
    let row, col;
    do {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    } while (playerBoard[row][col] !== null);

    const newBoard = playerBoard.map(row => row.slice());
    if (newBoard[row][col] === 'S') {
      newBoard[row][col] = 'H';
    } else {
      newBoard[row][col] = 'M';
    }

    setPlayerBoard(newBoard);
    checkWinner(newBoard, 'Computer');
  };

  const checkWinner = (board, player) => {
    const allShipsSunk = board.flat().filter(cell => cell === 'S').length === 0;
    if (allShipsSunk) {
      setGameOver(true);
      setWinner(player);
    }
  };

  return (
    <div className="App">
      <h1>Battleship</h1>
      {gameOver && <h2>{winner} wins!</h2>}
      <div className="boards">
        <div>
          <h2>Player Board</h2>
          <Board board={playerBoard} onCellClick={() => {}} />
        </div>
        <div>
          <h2>Computer Board</h2>
          <Board board={computerBoard} onCellClick={handlePlayerMove} />
        </div>
      </div>
    </div>
  );
};

export default App;
