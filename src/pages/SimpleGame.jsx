import React from 'react';
import 'regenerator-runtime/runtime';
import { GameEngine } from 'react-game-engine';
import MovesSystem from '../systems/MovesSystem';
import setupGame from '../utilities/gameUtility';

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
      systems={[MovesSystem]}
      entities={entities}
    />
  );
};

export default SimpleGame;
