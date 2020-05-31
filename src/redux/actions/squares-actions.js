import { RESET_HIGHLIGHTS } from '@redux/actionNames';

export const resetHighlights = squaresToUpdate => dispatch => {
  const squares = squaresToUpdate;
  for (let idx = 0; idx < squares.length; idx += 1) {
    squares[idx].highlightedSquareToMoveTo = false;
    squares[idx].highlightedPieceToMove = false;
  }
  dispatch({ type: RESET_HIGHLIGHTS, squares });
};
