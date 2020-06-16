import { CLEAR_PIECE_SELECTED, PIECE_SELECTED, RESET_GAME, SWITCH_PLAYER } from '@redux/actionNames';
import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';

export const switchPlayer = () => ({
  type: SWITCH_PLAYER,
});

export const setMoveSelectedStartSquareName = ({ row, col }) => ({
  type: PIECE_SELECTED,
  squareName: getSquareNameFromRowCol(row, col),
});

export const clearMoveSelectedStartSquareName = () => ({
  type: CLEAR_PIECE_SELECTED,
});

export const resetGame = () => ({
  type: RESET_GAME,
});
