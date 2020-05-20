import { getIdx } from '../rowColToIndexUtility';
import { isEnemyPiece, maxBound, minBound } from '../movesUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import pieceTypes from '../../constants/pieceTypes';

const getKingMoves = (isWhite, row, col, squares) => {
  const moves = [];
  const checkMove = (checkRow, checkCol, checkRowBound, checkColBound) => {
    if (checkRowBound(checkRow) && checkColBound(checkCol)) {
      const pieceType = squares[getIdx(checkRow, checkCol)].piece.type;
      if (pieceType === pieceTypes.EMPTY_SQUARE || isEnemyPiece(pieceType, isWhite)) {
        moves.push(getSquareNameFromRowCol(checkRow, checkCol));
      }
    }
  };
  checkMove(row - 1, col + 1, minBound, maxBound); // north east
  checkMove(row, col + 1, () => true, maxBound); // east
  checkMove(row + 1, col + 1, maxBound, maxBound); // south east
  checkMove(row + 1, col, maxBound, () => true); // south
  checkMove(row + 1, col - 1, maxBound, minBound); // south west
  checkMove(row, col - 1, () => true, minBound); // west
  checkMove(row - 1, col - 1, minBound, minBound); // north west

  return moves;
};

export default getKingMoves;
