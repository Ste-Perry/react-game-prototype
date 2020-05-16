import React from 'react';
import 'regenerator-runtime/runtime';
import { GameEngine } from 'react-game-engine';
// import MoveBox from '../systems/MoveBox';
import squareFactory from '../utillities/squareFactory';
import getSquareNameFromRowCol from '../utillities/squareUtils';
import Square from '../components/Square';

const SimpleGame = () => {
  const entities = {};
  const squares = squareFactory();
  squares.forEach(square => {
    const squareName = getSquareNameFromRowCol(
      square.row,
      square.col
    );
    entities[squareName] = {
      square,
      renderer: <Square />,
    };
  });
  return (
    <GameEngine
      style={{
        width: 640,
        height: 640,
        backgroundColor: 'blue',
      }}
      // systems={[MoveBox]}
      entities={entities}
    />
  );
};

export default SimpleGame;
