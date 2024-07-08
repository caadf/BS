// src/components/Ship.js
import React from 'react';

const Ship = ({ length, orientation }) => {
    const style = {
        width: orientation === 'horizontal' ? `${length * 50}px` : '50px',
        height: orientation === 'vertical' ? `${length * 50}px` : '50px',
        backgroundColor: 'gray',
        margin: '1px',
    };

    return <div style={style}></div>;
};

export default Ship;
