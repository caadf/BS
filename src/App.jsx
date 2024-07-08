// src/App.js
import React from 'react';
import Board from './components/Board';

const App = () => {
    return (
        <div className="App">
            <h1>Battleship Game</h1>
            <Board size={10} />
        </div>
    );
};

export default App;

