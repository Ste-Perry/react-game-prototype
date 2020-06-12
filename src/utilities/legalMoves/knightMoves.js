import pieceTypes from '@constants/pieceTypes';
import { getIdxFromRowCol } from '../rowColToIndexUtility';
import { isEmptyIfFriendlyCaptured, isEnemyPiece, maxBound, minBound } from '../movesUtility';
import { getSquareNameFromRowCol } from '../squareNameUtility';

const checkMove = ({ isWhite, rowToCheck, colToCheck, squares, checkingAttacks = false }) => {
  if (minBound(rowToCheck) && maxBound(rowToCheck) && minBound(colToCheck) && maxBound(colToCheck)) {
    const pieceType = squares[getIdxFromRowCol(rowToCheck, colToCheck)].piece.type;
    return !!(
      isEmptyIfFriendlyCaptured(pieceType, isWhite, checkingAttacks) ||
      pieceType === pieceTypes.EMPTY_SQUARE ||
      isEnemyPiece(pieceType, isWhite)
    );
  }
  return false;
};

export const getKnightMoves = ({ isWhite, from, squares, checkingAttacks = false }) => {
  // arguably the most complicated of all the pieces, as it can jump over and moves
  // to 8 different spots that aren't simply on either the bishop or rook moves
  const moves = [];
  const { row, col } = from;

  const checkMoveAndPush = (rowToCheck, colToCheck) => {
    if (checkMove({ isWhite, rowToCheck, colToCheck, squares, checkingAttacks })) {
      moves.push(getSquareNameFromRowCol(rowToCheck, colToCheck));
    }
  };

  checkMoveAndPush(row + 1, col + 2);
  checkMoveAndPush(row + 2, col + 1);
  checkMoveAndPush(row + 1, col - 2);
  checkMoveAndPush(row + 2, col - 1);
  checkMoveAndPush(row - 1, col + 2);
  checkMoveAndPush(row - 2, col + 1);
  checkMoveAndPush(row - 1, col - 2);
  checkMoveAndPush(row - 2, col - 1);
  return moves;
};

export const isLegalKnightMove = ({ from, to, squares }) => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;
  const pieceType = squares[getIdxFromRowCol(fromRow, fromCol)].piece.type;

  if (pieceType !== pieceTypes.WHITE_KNIGHT || pieceType !== pieceTypes.BLACK_KNIGHT) {
    throw Error(`unexpected piece type ${pieceType} when checking legal knight moves`);
  }

  if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) || (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
    return checkMove({
      isWhite: pieceType === pieceTypes.WHITE_KNIGHT,
      rowToCheck: toRow,
      colToCheck: toCol,
      squares,
    });
  }
  return false;
};
