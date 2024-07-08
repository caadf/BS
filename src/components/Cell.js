// src/components/Cell.js
import React from 'react';

const Cell = ({ isShip }) => {
    const style = {
        width: '50px',
        height: '50px',
        backgroundColor: isShip ? 'blue' : 'lightblue',
        border: '1px solid #999',
    };

    return <div style={style}></div>;
};

export default Cell;
