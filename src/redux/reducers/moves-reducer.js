import { getSquareNameFromRowCol } from '@utilities/squareNameUtility';
import { ADD_MOVE, RESET_GAME } from '@redux/actionNames';

const initialMoves = [];

const getMoveDescription = action => {
  const { from, to, isWhite } = action;
  return `${isWhite ? 'WHITE' : 'BLACK'}: ${getSquareNameFromRowCol(from.row, from.col)}-${getSquareNameFromRowCol(to.row, to.col)}`;
};

const movesReducer = (moves = initialMoves, action) => {
  switch (action.type) {
    case RESET_GAME:
      return initialMoves;
    case ADD_MOVE:
      return [...moves, getMoveDescription(action)];
    default:
      return moves;
  }
};

export default movesReducer;
