import React from 'react';
import { GameEngine } from 'react-game-engine';
import MoveBox from '../systems/MoveBox';
import Box from '../components/Box';

const SimpleGame = () => (
  <GameEngine
    style={{ width: 800, height: 600, backgroundColor: 'blue' }}
    systems={[MoveBox]}
    entities={{
      box1: {
        x: 200,
        y: 200,
        renderer: <Box />,
      },
    }}
  />
);

export default SimpleGame;
