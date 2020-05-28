import { ADD_MOVE, RESET_MOVES } from '../actionNames';

export const addMove = (fromSquare, toSquare, isWhite) => ({
  type: ADD_MOVE,
  move: `${isWhite ? 'WHITE' : 'BLACK'}: ${fromSquare}-${toSquare}`,
});

export const resetMoves = () => ({
  type: RESET_MOVES,
});
