import { getIdx } from '../rowColToIndexUtility';
import { isEnemyPiece, maxBound, minBound } from '../movesUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import pieceTypes from '../../constants/pieceTypes';

const getKnightMoves = (isWhite, row, col, squares) => {
  // arguably the most complicated of all the pieces, as it can jump over and moves
  // to 8 different spots that aren't simply on either the bishop or rook moves
  const moves = [];
  const checkMove = (rowToCheck, colToCheck) => {
    if (minBound(rowToCheck) && maxBound(rowToCheck) && minBound(colToCheck) && maxBound(colToCheck)) {
      const pieceType = squares[getIdx(rowToCheck, colToCheck)].piece.type;
      if (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, isWhite)) {
        moves.push(getSquareNameFromRowCol(rowToCheck, colToCheck));
      }
    }
  };

  checkMove(row + 1, col + 2);
  checkMove(row + 2, col + 1);
  checkMove(row + 1, col - 2);
  checkMove(row + 2, col - 1);
  checkMove(row - 1, col + 2);
  checkMove(row - 2, col + 1);
  checkMove(row - 1, col - 2);
  checkMove(row - 2, col - 1);
  return moves;
};

export default getKnightMoves;
