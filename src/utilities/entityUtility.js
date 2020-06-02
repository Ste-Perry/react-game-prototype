import React from 'react';
import GameStatsDisplay from '@components/GameStatsDisplay.jsx';
import { getAllSquareNames, getIdxFromSquareName } from './squareNameUtility';
import Square from '../components/Square';

export const buildDefaultEntities = () => {
  const entities = {};
  getAllSquareNames().forEach(squareName => {
    entities[squareName] = {
      idx: getIdxFromSquareName(squareName),
      squareName,
      renderer: <Square />,
    };
  });
  entities.gameStatsDisplay = {
    renderer: <GameStatsDisplay />,
  };
  return entities;
};
