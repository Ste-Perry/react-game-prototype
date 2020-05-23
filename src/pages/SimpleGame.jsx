import React from 'react';
import 'regenerator-runtime/runtime';
import { GameEngine } from 'react-game-engine';
import MoveBox from '../systems/MoveBox';
import setupGame from '../utillities/gameUtility';

const SimpleGame = () => {
  const entities = setupGame();
  return (
    <GameEngine
      style={{
        border: 'solid 5px #999',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 802,
        height: 1010,
      }}
      systems={[MoveBox]}
      entities={entities}
    />
  );
};

export default SimpleGame;
