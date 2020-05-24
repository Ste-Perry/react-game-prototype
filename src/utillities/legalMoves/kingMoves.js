import { getIdx } from '../rowColToIndexUtility';
import { isEmptyIfFriendlyCaptured, isEnemyPiece, maxBound, minBound } from '../movesUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';
import pieceTypes from '../../constants/pieceTypes';

const getKingMoves = (isWhite, row, col, squares, checkingAttacks = false) => {
  const moves = [];
  const checkMove = (checkRow, checkCol, checkRowBound, checkColBound) => {
    if (checkRowBound(checkRow) && checkColBound(checkCol)) {
      const pieceType = squares[getIdx(checkRow, checkCol)].piece.type;
      if (
        isEmptyIfFriendlyCaptured(pieceType, isWhite, checkingAttacks) ||
        pieceType === pieceTypes.EMPTY_SQUARE ||
        isEnemyPiece(pieceType, isWhite)
      ) {
        moves.push(getSquareNameFromRowCol(checkRow, checkCol));
      } else {
        console.log(`can't move to row ${checkRow}, col ${checkCol} - square is friendly piece of type ${pieceType}`);
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
  checkMove(row - 1, col, minBound, () => true); // north

  return moves;
};

export default getKingMoves;
