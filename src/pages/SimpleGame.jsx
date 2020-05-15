import React from 'react';
import 'regenerator-runtime/runtime';
import { GameEngine } from 'react-game-engine';
import MoveBox from '../systems/MoveBox';
import Box from '../components/Box';

const SimpleGame = () => (
  <GameEngine
    style={{
      width: 800,
      height: 600,
      backgroundColor: 'blue',
    }}
    systems={[MoveBox]}
    entities={{
      board: {
        width: 800,
        height: 600,
        renderer: <div style={{ display: 'none' }} />,
      },
      box1: {
        x: 58,
        y: 58,
        renderer: <Box x={58} y={58} />,
      },
    }}
  />
);

export default SimpleGame;
