// src/components/Board.js
import React from 'react';
import Cell from './Cell';
import Ship from './Ship';

const Board = ({ size }) => {
    const [board, setBoard] = React.useState([]);
    const [ships, setShips] = React.useState([]);

    // Función para generar posiciones aleatorias
    const getRandomPosition = () => {
        return Math.floor(Math.random() * size);
    };

    // Función para colocar los barcos aleatoriamente en el tablero
    const placeShipsRandomly = () => {
        const newShips = [];
        for (let i = 1; i <= 5; i++) {  // Generamos 5 barcos de diferentes tamaños
            const length = i;
            const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            let x, y;
            if (orientation === 'horizontal') {
                x = getRandomPosition();
                y = getRandomPosition() - length + 1;
            } else {
                x = getRandomPosition() - length + 1;
                y = getRandomPosition();
            }
            newShips.push({ id: i, x, y, length, orientation });
        }
        setShips(newShips);
    };

    // Inicializamos el tablero
    React.useEffect(() => {
        const newBoard = Array(size).fill(Array(size).fill(false));
        setBoard(newBoard);
        placeShipsRandomly();
    }, []);

    return (
        <div>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <Cell key={colIndex} isShip={false} />
                    ))}
                </div>
            ))}
            {ships.map((ship) => (
                <Ship key={ship.id} length={ship.length} orientation={ship.orientation} />
            ))}
        </div>
    );
};

export default Board;
