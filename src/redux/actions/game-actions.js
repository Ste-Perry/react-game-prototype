import { CLEAR_PIECE_SELECTED, PIECE_SELECTED, RESET_GAME, SWITCH_PLAYER } from '../actionNames';

export const switchPlayer = () => ({
  type: SWITCH_PLAYER,
});

export const setPieceSelected = (row, col) => ({
  type: PIECE_SELECTED,
  row,
  col,
});

export const clearPieceSelected = () => ({
  type: CLEAR_PIECE_SELECTED,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
