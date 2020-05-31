import { ADD_MOVE } from '../actionNames';

export const addMove = (fromSquare, toSquare, isWhite) => ({
  type: ADD_MOVE,
  move: `${isWhite ? 'WHITE' : 'BLACK'}: ${fromSquare}-${toSquare}`,
});
