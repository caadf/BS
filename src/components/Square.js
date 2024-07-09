// src/components/Cell.js
import React from 'react';

/* import './Square.css'; // Estilos básicos para el cuadro */

const Square = ({ value, onClick }) => {
  return (
    <button className={`square ${value}`} onClick={onClick}>
      {/* El valor puede ser 'ship', 'water', 'hit', 'miss', etc. */}
    </button>
  );
};

export default Square;
