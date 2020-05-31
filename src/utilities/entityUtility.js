import React from 'react';
import GameStatsDisplay from '@components/GameStatsDisplay.jsx';
import { getAllSquareNames, getIdxFromSquareName } from './squareNameUtility';
import Square from '../components/Square';

export const buildDefaultEntities = (game, squares) => {
  const entities = {};
  getAllSquareNames().forEach(squareName => {
    entities[squareName] = {
      square: squares[getIdxFromSquareName(squareName)],
      renderer: <Square />,
    };
  });
  entities.gameStatsDisplay = {
    gameState: game,
    renderer: <GameStatsDisplay />,
  };
  return entities;
};
