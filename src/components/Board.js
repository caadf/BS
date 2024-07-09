// src/components/Board.jsimport React from 'react';
import React from 'react';
import Square from './Square';

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => (
            <Square key={colIndex} value={square} onClick={() => onClick(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
