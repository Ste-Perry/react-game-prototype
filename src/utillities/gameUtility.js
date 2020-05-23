import React from 'react';
import squareFactory from './squareFactory';
import { getSquareNameFromRowCol } from './squareNameUtility';
import Square from '../components/Square';
import GameStatsDisplay from '../components/GameStatsDisplay';

const setupGame = () => {
  const entities = {};
  const gameState = {
    isWhiteMove: true,
    pieceSelected: null,
    reset: false,
  };
  const squares = squareFactory();
  squares.forEach(square => {
    const squareName = getSquareNameFromRowCol(square.row, square.col);
    entities[squareName] = {
      square,
      renderer: <Square />,
    };
    entities.gameStatsDisplay = {
      gameState,
      resetGame: () => {
        alert('resetting!');
        entities.gameState.reset = true;
      },
      renderer: <GameStatsDisplay />,
    };
    entities.squares = squares;
    entities.gameState = gameState;
    entities.resetGame = () => {
      alert('resetting!');
      entities.gameState.reset = true;
    };
  });
  return entities;
};

export default setupGame;
